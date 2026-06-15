const adminApp = (() => {
  let quill;
  let articles = [];
  let currentArticleId = null;
  let selectedBranches = new Set();
  let currentTags = [];

  // Initialize Admin
  async function init() {
    bindEvents();
    populateBranchCheckboxes();
    initQuill();
    await fetchArticles();
    showView('dashboard');
  }

  function bindEvents() {
    // Sidebar navigation
    document.querySelectorAll('.sidebar-link[data-target]').forEach(link => {
      link.addEventListener('click', (e) => {
        showView(e.currentTarget.dataset.target);
      });
    });

    // Semester change -> Populate subjects
    document.getElementById('article-semester').addEventListener('change', populateSubjects);
    
    // Subject change -> Populate practicals
    document.getElementById('article-subject').addEventListener('change', populatePracticals);

    // Save Article
    document.getElementById('save-article-btn').addEventListener('click', saveArticle);

    // Tags Input
    const tagInput = document.getElementById('tag-input');
    tagInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const tag = tagInput.value.trim().toLowerCase();
        if (tag && !currentTags.includes(tag)) {
          currentTags.push(tag);
          renderTags();
        }
        tagInput.value = '';
      }
    });
  }

  function showView(viewId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
    
    document.getElementById(`view-${viewId}`).classList.add('active');
    
    const navLink = document.querySelector(`.sidebar-link[data-target="${viewId}"]`);
    if (navLink) navLink.classList.add('active');

    if (viewId === 'dashboard') {
      fetchArticles(); // refresh list
    }
  }

  function initQuill() {
    quill = new Quill('#editor-container', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ],
          handlers: {
            image: imageHandler
          }
        }
      }
    });
  }

  // Custom Image Handler to upload via API instead of Base64 embedding
  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*, application/pdf');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('media_file', file);

      try {
        const res = await fetch('/api/upload-media', { method: 'POST', body: formData });
        const data = await res.json();
        
        if (res.ok) {
          const range = quill.getSelection();
          if (file.type === 'application/pdf') {
            // Insert PDF as a link for now, Quill doesn't native embed PDFs easily without custom blot
            quill.insertText(range.index, `📄 View Attached PDF: ${file.name}`, 'link', data.url);
          } else {
            quill.insertEmbed(range.index, 'image', data.url);
          }
        } else {
          showToast(data.error || 'Upload failed', 'error');
        }
      } catch (err) {
        showToast('Network error uploading media', 'error');
      }
    };
  }

  function populateBranchCheckboxes() {
    const container = document.getElementById('branch-checkboxes');
    container.innerHTML = '';
    msbteData.branches.forEach(b => {
      const label = document.createElement('label');
      label.className = 'branch-checkbox';
      label.innerHTML = `<input type="checkbox" value="${b.id}"> ${b.code}`;
      
      label.addEventListener('change', (e) => {
        if (e.target.checked) {
          selectedBranches.add(b.id);
          label.classList.add('selected');
        } else {
          selectedBranches.delete(b.id);
          label.classList.remove('selected');
        }
        // Repopulate subjects if semester is already selected based on first selected branch
        populateSubjects();
      });

      container.appendChild(label);
    });
  }

  function populateSubjects() {
    const sem = document.getElementById('article-semester').value;
    const subSelect = document.getElementById('article-subject');
    const pracSelect = document.getElementById('article-practical');
    
    subSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
    pracSelect.innerHTML = '<option value="" disabled selected>Select Practical</option>';
    pracSelect.disabled = true;

    if (!sem || selectedBranches.size === 0) {
      subSelect.disabled = true;
      return;
    }

    subSelect.disabled = false;
    
    // We get subjects from the first selected branch (assuming subject codes map identically or similarly)
    const firstBranchId = Array.from(selectedBranches)[0];
    const branch = msbteData.branches.find(b => b.id === firstBranchId);
    
    if (branch && branch.semesters[sem]) {
      branch.semesters[sem].forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub.code;
        opt.textContent = `${sub.name} (${sub.code})`;
        subSelect.appendChild(opt);
      });
    }
  }

  function populatePracticals() {
    const subSelect = document.getElementById('article-subject');
    const pracSelect = document.getElementById('article-practical');
    
    if (!subSelect.value) {
      pracSelect.disabled = true;
      return;
    }

    pracSelect.disabled = false;
    pracSelect.innerHTML = '<option value="" disabled selected>Select Practical</option>';
    for (let i = 1; i <= 16; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `Practical No. ${i}`;
      pracSelect.appendChild(opt);
    }
  }

  function renderTags() {
    const container = document.getElementById('tags-container');
    // Remove existing badges
    container.querySelectorAll('.tag-badge').forEach(b => b.remove());
    
    currentTags.forEach(tag => {
      const badge = document.createElement('div');
      badge.className = 'tag-badge';
      badge.innerHTML = `${tag} <button type="button" onclick="adminApp.removeTag('${tag}')">&times;</button>`;
      container.insertBefore(badge, document.getElementById('tag-input'));
    });
  }

  function removeTag(tag) {
    currentTags = currentTags.filter(t => t !== tag);
    renderTags();
  }

  async function fetchArticles() {
    try {
      const res = await fetch('/api/articles');
      if (res.ok) {
        articles = await res.json();
        renderTable();
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to load articles', 'error');
    }
  }

  function renderTable() {
    const tbody = document.getElementById('articles-table-body');
    tbody.innerHTML = '';
    
    if (articles.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No articles published yet.</td></tr>';
      return;
    }

    articles.forEach(art => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${art.title}</strong></td>
        <td>${art.subject}</td>
        <td>Prac ${art.practical}</td>
        <td>${art.branches.map(b => b.toUpperCase()).join(', ')}</td>
        <td>${new Date(art.updatedAt).toLocaleDateString()}</td>
        <td>
          <button class="action-btn" onclick="adminApp.editArticle('${art.id}')" title="Edit"><span class="material-icons-round">edit</span></button>
          <button class="action-btn delete" onclick="adminApp.deleteArticle('${art.id}')" title="Delete"><span class="material-icons-round">delete</span></button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function openEditor() {
    currentArticleId = null;
    document.getElementById('article-id').value = '';
    document.getElementById('editor-page-title').textContent = 'Write New Article';
    document.getElementById('article-form').reset();
    
    selectedBranches.clear();
    document.querySelectorAll('.branch-checkbox').forEach(lbl => {
      lbl.classList.remove('selected');
      lbl.querySelector('input').checked = false;
    });

    currentTags = [];
    renderTags();
    quill.root.innerHTML = '';
    
    document.getElementById('article-subject').disabled = true;
    document.getElementById('article-practical').disabled = true;

    showView('editor');
  }

  function editArticle(id) {
    const art = articles.find(a => a.id === id);
    if (!art) return;

    currentArticleId = art.id;
    document.getElementById('editor-page-title').textContent = 'Edit Article';
    document.getElementById('article-title').value = art.title;

    // Branches
    selectedBranches.clear();
    document.querySelectorAll('.branch-checkbox').forEach(lbl => {
      const input = lbl.querySelector('input');
      if (art.branches.includes(input.value)) {
        input.checked = true;
        lbl.classList.add('selected');
        selectedBranches.add(input.value);
      } else {
        input.checked = false;
        lbl.classList.remove('selected');
      }
    });

    // Semester
    document.getElementById('article-semester').value = art.semester;
    populateSubjects();

    // Subject
    setTimeout(() => {
      document.getElementById('article-subject').value = art.subject;
      populatePracticals();
      
      // Practical
      setTimeout(() => {
        document.getElementById('article-practical').value = art.practical;
      }, 50);
    }, 50);

    // Tags
    currentTags = [...art.tags];
    renderTags();

    // Content
    quill.root.innerHTML = art.content;

    showView('editor');
  }

  async function saveArticle() {
    const title = document.getElementById('article-title').value.trim();
    const semester = document.getElementById('article-semester').value;
    const subject = document.getElementById('article-subject').value;
    const practical = document.getElementById('article-practical').value;
    const content = quill.root.innerHTML;

    if (!title || selectedBranches.size === 0 || !semester || !subject || !practical || quill.getText().trim() === '') {
      showToast('Please fill all required fields and select at least one branch.', 'error');
      return;
    }

    const payload = {
      title,
      branches: Array.from(selectedBranches),
      semester,
      subject,
      practical,
      tags: currentTags,
      content
    };

    const url = currentArticleId ? `/api/articles/${currentArticleId}` : '/api/articles';
    const method = currentArticleId ? 'PUT' : 'POST';

    const btn = document.getElementById('save-article-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Saving...';
    btn.disabled = true;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast('Article saved successfully!');
        showView('dashboard');
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save', 'error');
      }
    } catch (err) {
      showToast('Network error saving article', 'error');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }

  async function deleteArticle(id) {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Article deleted');
        fetchArticles();
      } else {
        showToast('Failed to delete', 'error');
      }
    } catch (err) {
      showToast('Network error', 'error');
    }
  }

  function showToast(message, type = "success") {
    const toast = document.getElementById("toast-notification");
    const toastText = document.getElementById("toast-message");
    const toastIcon = document.getElementById("toast-icon");

    toastText.textContent = message;
    if (type === "success") {
      toast.className = "toast-msg success-toast show";
      toastIcon.textContent = "check_circle";
    } else {
      toast.className = "toast-msg error-toast show";
      toastIcon.textContent = "error";
    }

    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // Init on load
  document.addEventListener('DOMContentLoaded', init);

  return { showView, openEditor, editArticle, deleteArticle, removeTag };
})();

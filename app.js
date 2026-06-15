(() => {
  // Initialize Application State
  const state = {
    currentBranch: null,
    currentSem: null,
    currentSubject: null,
    theme: localStorage.getItem("msbte-theme") || "dark",
    articles: [], // Will be populated from backend API
    completedPracticals: JSON.parse(localStorage.getItem("msbte-completed")) || {}
  };

  // Fetch articles from static json file for GitHub Pages
  async function fetchSolutions() {
    try {
      const res = await fetch(`data/articles.json?t=${Date.now()}`);
      if (res.ok) {
        state.articles = await res.json();
        // Re-render current view if needed
        if (location.hash.startsWith("#branch/") || location.hash.startsWith("#subject/") || location.hash === "#home" || location.hash === "") {
          router(); 
        }
      }
    } catch (e) {
      console.error("Failed to fetch solutions", e);
    }
  }
  fetchSolutions();

  // Global UI Selectors
  const themeToggleBtn = document.getElementById("theme-toggle");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mainSearchBar = document.getElementById("main-search-bar");
  const searchDropdown = document.getElementById("search-dropdown");
  const contactForm = document.getElementById("contact-us-form");

  // Set initial theme
  document.documentElement.setAttribute("data-theme", state.theme);
  updateThemeIcon();

  // Populate branches grid on home page
  populateBranchGrid();

  // Bind Routing Event Listeners
  window.addEventListener("hashchange", router);
  router(); // Run on initial load

  // --- Theme Toggle ---
  themeToggleBtn.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("msbte-theme", state.theme);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const icon = document.getElementById("theme-icon");
    if (state.theme === "dark") {
      icon.textContent = "light_mode";
    } else {
      icon.textContent = "dark_mode";
    }
  }

  // --- Mobile Navigation Drawer ---
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileDrawer.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!mobileDrawer.contains(e.target) && e.target !== mobileMenuToggle) {
      mobileDrawer.classList.remove("active");
    }
  });

  // --- Main Search Bar functionality ---
  mainSearchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchDropdown.style.display = "none";
      return;
    }

    const matches = [];
    
    // 1. Search Subjects
    msbteData.branches.forEach(branch => {
      Object.entries(branch.semesters).forEach(([sem, subjects]) => {
        subjects.forEach(subject => {
          if (subject.name.toLowerCase().includes(query) || subject.code.toLowerCase().includes(query)) {
            matches.push({
              type: 'subject',
              branchId: branch.id,
              branchCode: branch.code,
              sem: sem,
              code: subject.code,
              name: subject.name
            });
          }
        });
      });
    });

    // 2. Search Articles (Practicals & Tags)
    state.articles.forEach(art => {
      const matchTag = art.tags && art.tags.some(t => t.includes(query));
      const matchTitle = art.title.toLowerCase().includes(query);
      if (matchTag || matchTitle) {
        // Just push the article match
        matches.push({
          type: 'article',
          id: art.id,
          title: art.title,
          tags: art.tags ? art.tags.join(', ') : '',
          subjectCode: art.subject
        });
      }
    });

    if (matches.length > 0) {
      searchDropdown.innerHTML = matches.slice(0, 8).map(m => {
        if (m.type === 'subject') {
          return `
            <div class="search-result-item" data-type="subject" data-branch="${m.branchId}" data-sem="${m.sem}" data-code="${m.code}">
              <span class="search-result-title"><span class="material-icons-round" style="font-size:14px;vertical-align:middle;">book</span> ${m.name}</span>
              <span class="search-result-meta">${m.branchCode} | Sem ${m.sem}</span>
            </div>
          `;
        } else {
          return `
            <div class="search-result-item" data-type="article" data-id="${m.id}">
              <span class="search-result-title"><span class="material-icons-round" style="font-size:14px;vertical-align:middle;">article</span> ${m.title}</span>
              <span class="search-result-meta">Sub: ${m.subjectCode} | Tags: ${m.tags}</span>
            </div>
          `;
        }
      }).join("");
      
      // Bind clicks to search items
      searchDropdown.querySelectorAll(".search-result-item").forEach(item => {
        item.addEventListener("click", () => {
          const type = item.getAttribute("data-type");
          if (type === 'subject') {
            const bId = item.getAttribute("data-branch");
            const sem = item.getAttribute("data-sem");
            const code = item.getAttribute("data-code");
            location.hash = `#subject/${bId}/${sem}/${code}`;
          } else {
            const id = item.getAttribute("data-id");
            location.hash = `#article/${id}`;
          }
          mainSearchBar.value = "";
          searchDropdown.style.display = "none";
        });
      });

      searchDropdown.style.display = "block";
    } else {
      searchDropdown.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-secondary);">No subjects found for "${e.target.value}"</div>`;
      searchDropdown.style.display = "block";
    }
  });

  // Close search dropdown on click outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      searchDropdown.style.display = "none";
    }
  });

  // --- Accordions (FAQs & Semester) ---
  // FAQs list accordions
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const parent = q.parentElement;
      const isOpen = parent.classList.contains("open");
      
      // Close other FAQs
      document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("open"));
      
      if (!isOpen) {
        parent.classList.add("open");
      }
    });
  });

  // Contact Us Form Submit
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Your message was sent successfully! We will write back soon.", "success");
    contactForm.reset();
  });

  // Toast Functionality
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

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  // --- SPA ROUTER ---
  function router() {
    const hash = window.location.hash || "#home";
    
    // Hide drawer if active on navigation
    mobileDrawer.classList.remove("active");

    // Clear active links
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(link => {
      link.classList.remove("active");
    });

    // Sub-routes parsing
    if (hash.startsWith("#branch/")) {
      const parts = hash.split("/");
      const branchId = parts[1];
      showView("branch");
      renderBranchView(branchId);
    } 
    else if (hash.startsWith("#subject/")) {
      const parts = hash.split("/");
      const branchId = parts[1];
      const semNum = parts[2];
      const subjectCode = parts[3];
      showView("subject");
      renderSubjectView(branchId, semNum, subjectCode);
    } 
    else if (hash.startsWith("#article/")) {
      const id = hash.split("/")[1];
      showView("article");
      renderArticleView(id);
    }
    else {
      // Direct view matching
      const viewName = hash.replace("#", "");
      const targetLink = document.querySelector(`.nav-link[data-view="${viewName}"], .mobile-nav-link[data-view="${viewName}"]`);
      if (targetLink) {
        targetLink.classList.add("active");
      }
      showView(viewName);
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showView(viewId) {
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });
    const section = document.getElementById(`view-${viewId}`);
    if (section) {
      section.classList.add("active");
    }
  }

  // --- VIEW RENDERING ENGINE ---
  
  // 1. Populates the branch selection grids on home view
  function populateBranchGrid() {
    const grid = document.getElementById("branches-list-grid");
    grid.innerHTML = msbteData.branches.map(branch => `
      <div class="glass-card branch-card" data-branch="${branch.id}" style="--branch-color: ${branch.color}">
        <div class="branch-icon-wrap">
          <span class="material-icons-round">${branch.icon}</span>
        </div>
        <h3>${branch.name} (${branch.code})</h3>
        <p>${branch.description}</p>
        <div class="branch-link-btn">
          View Semesters
          <span class="material-icons-round">east</span>
        </div>
      </div>
    `).join("");

    // Add click listeners to cards
    grid.querySelectorAll(".branch-card").forEach(card => {
      card.addEventListener("click", () => {
        const branchId = card.getAttribute("data-branch");
        location.hash = `#branch/${branchId}`;
      });
    });
  }

  // 2. Render Branch Details (Semesters and subjects accordion)
  function renderBranchView(branchId) {
    const branch = msbteData.branches.find(b => b.id === branchId);
    if (!branch) {
      location.hash = "#home";
      return;
    }

    // Header updates
    const header = document.getElementById("branch-details-header");
    header.innerHTML = `
      <div class="branch-title-group">
        <h2>
          <span class="material-icons-round" style="color: ${branch.color}">${branch.icon}</span>
          ${branch.name} Solutions
        </h2>
        <p>Choose your semester to access subjects and solved manuals.</p>
      </div>
    `;

    // Back button wiring
    document.getElementById("branch-back-btn").onclick = () => {
      location.hash = "#home";
    };

    // Accordion List
    const accList = document.getElementById("semester-accordion-list");
    accList.innerHTML = "";

    // Generate semesters 1 to 6 accordion
    for (let sem = 1; sem <= 6; sem++) {
      const subjects = branch.semesters[sem] || [];
      const row = document.createElement("div");
      row.className = `semester-row ${state.currentSem === sem ? "open" : ""}`;
      
      row.innerHTML = `
        <button class="semester-trigger" data-sem="${sem}">
          <div class="semester-info">
            <div class="sem-num-badge" style="background: rgba(99, 102, 241, 0.1); color: var(--primary)">${sem}</div>
            <div class="sem-details">
              <h3>Semester ${sem}</h3>
              <span>${subjects.length} Subjects available</span>
            </div>
          </div>
          <span class="material-icons-round sem-chevron">expand_more</span>
        </button>
        <div class="semester-content">
          <div class="subjects-grid">
            ${subjects.map(sub => {
              const completedCount = Object.keys(state.completedPracticals).filter(key => key.startsWith(`${sub.code}-`) && state.completedPracticals[key]).length;

              return `
                <div class="subject-card" data-code="${sub.code}">
                  <span class="subject-code">${sub.code}</span>
                  <h4>${sub.name}</h4>
                  <div class="subject-stat-bar">
                    <span>
                      <span class="material-icons-round" style="font-size: 0.9rem;">check_circle</span>
                      ${completedCount}/${sub.practicals} Check
                    </span>
                    <span>
                      <span class="material-icons-round" style="font-size: 0.9rem;">cloud_done</span>
                      ${sub.practicals} Solved
                    </span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;

      // Accordion trigger click event
      row.querySelector(".semester-trigger").addEventListener("click", () => {
        const isCurrentOpen = row.classList.contains("open");
        accList.querySelectorAll(".semester-row").forEach(r => r.classList.remove("open"));
        if (!isCurrentOpen) {
          row.classList.add("open");
          state.currentSem = sem;
        } else {
          state.currentSem = null;
        }
      });

      // Navigate to subject cards
      row.querySelectorAll(".subject-card").forEach(subCard => {
        subCard.addEventListener("click", (e) => {
          e.stopPropagation();
          const subjectCode = subCard.getAttribute("data-code");
          location.hash = `#subject/${branchId}/${sem}/${subjectCode}`;
        });
      });

      accList.appendChild(row);
    }
  }

  // 3. Render Subject & Practicals (Practical 1 to 12)
  function renderSubjectView(branchId, semNum, subjectCode) {
    const branch = msbteData.branches.find(b => b.id === branchId);
    if (!branch) {
      location.hash = "#home";
      return;
    }

    const subject = branch.semesters[semNum].find(s => s.code === subjectCode);
    if (!subject) {
      location.hash = `#branch/${branchId}`;
      return;
    }

    // Set page parameters
    state.currentBranch = branchId;
    state.currentSem = semNum;
    state.currentSubject = subjectCode;

    // Back navigation to semester list
    document.getElementById("subject-back-btn").onclick = () => {
      location.hash = `#branch/${branchId}`;
    };

    // Card Header Update
    const subjectCardHeader = document.getElementById("subject-details-card");
    const totalPracticals = 12;
    
    // Calculate progress based on checked practicals
    const completedList = Object.keys(state.completedPracticals).filter(key => key.startsWith(`${subjectCode}-`) && state.completedPracticals[key]);
    const progressPercent = Math.min(100, Math.round((completedList.length / totalPracticals) * 100));

    subjectCardHeader.innerHTML = `
      <div class="subject-header-info">
        <div class="sem-num-badge" style="background: ${branch.color}; color: #ffffff">${branch.code}</div>
        <div class="subject-details">
          <h2>${subject.name} Solutions</h2>
          <p>${branch.name} &bull; Semester ${semNum} &bull; Subject Code: ${subjectCode}</p>
        </div>
      </div>
      <div class="progress-container">
        <span class="progress-label">Submission Progress: <strong>${progressPercent}%</strong> (${completedList.length}/${totalPracticals})</span>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
    `;

    // Render Practicals 1 to 12
    const rowsContainer = document.getElementById("practicals-rows-container");
    rowsContainer.innerHTML = "";

    const practicalCount = subject.practicals || 12;

    for (let i = 1; i <= practicalCount; i++) {
      const pracNum = i;
      const progressKey = `${subjectCode}-${pracNum}`;

      // Check if admin has published an article for this practical
      const adminArticle = state.articles.find(a => 
        a.branches.includes(branchId) && 
        parseInt(a.semester) === parseInt(semNum) && 
        a.subject === subjectCode && 
        parseInt(a.practical) === pracNum
      );

      const isCompleted = state.completedPracticals[`${subjectCode}-${pracNum}`];

      const row = document.createElement("div");
      row.className = "practical-row";
      
      row.innerHTML = `
        <div class="prac-info">
          <div class="prac-number">Practical ${pracNum}</div>
          <div class="prac-title">Assigned Lab Experiment ${pracNum}</div>
          <div class="prac-status ${isCompleted ? 'status-completed' : 'status-pending'}">
            <span class="material-icons-round">${isCompleted ? 'check_circle' : 'pending_actions'}</span>
            ${isCompleted ? 'Completed' : 'To Do'}
          </div>
        </div>

        <div class="prac-actions">
          ${adminArticle ? `
            <a href="#article/${adminArticle.id}" class="btn btn-primary" style="text-decoration:none;">
              <span class="material-icons-round">menu_book</span>
              Read Article
            </a>
          ` : `
            <button class="btn btn-outline" disabled style="opacity: 0.6; cursor: not-allowed;">
              <span class="material-icons-round">hourglass_empty</span>
              Pending Upload
            </button>
          `}
          
          <button class="btn btn-icon ${isCompleted ? 'completed-toggle-active' : ''}" 
            onclick="togglePracticalCompleted('${subjectCode}', ${pracNum})"
            title="${isCompleted ? 'Mark as Not Done' : 'Mark as Done'}">
            <span class="material-icons-round">${isCompleted ? 'undo' : 'done'}</span>
          </button>
        </div>
      `;

      // Status mark-complete check toggle click
      row.querySelector(".prac-status").addEventListener("click", (e) => {
        const key = `${subjectCode}-${pracNum}`;
        state.completedPracticals[key] = !state.completedPracticals[key];
        localStorage.setItem("msbte-completed", JSON.stringify(state.completedPracticals));
        
        // Re-render subject view to animate changes
        renderSubjectView(branchId, semNum, subjectCode);
      });

      rowsContainer.appendChild(row);
    }
  }

  // --- Render Article View ---
  function renderArticleView(id) {
    const article = state.articles.find(a => a.id === id);
    if (!article) {
      document.getElementById("article-display-content").innerHTML = "<p>Article not found.</p>";
      return;
    }

    // Set Header
    document.getElementById("article-display-title").textContent = article.title;
    document.getElementById("article-display-subject").innerHTML = `<span class="material-icons-round" style="font-size: 1rem; vertical-align: middle;">book</span> Sub: ${article.subject}`;
    document.getElementById("article-display-prac").innerHTML = `<span class="material-icons-round" style="font-size: 1rem; vertical-align: middle;">science</span> Prac: ${article.practical}`;
    document.getElementById("article-display-date").innerHTML = `<span class="material-icons-round" style="font-size: 1rem; vertical-align: middle;">update</span> ${new Date(article.updatedAt).toLocaleDateString()}`;

    // Render Tags
    const tagsContainer = document.getElementById("article-tags-display");
    if (article.tags && article.tags.length > 0) {
      tagsContainer.innerHTML = article.tags.map(t => `<span class="tag-badge" style="background: var(--primary-color); color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem;">#${t}</span>`).join("");
      tagsContainer.style.display = "flex";
    } else {
      tagsContainer.style.display = "none";
    }

    // Set HTML Content
    document.getElementById("article-display-content").innerHTML = article.content;

    // Back button routing
    const backBtn = document.getElementById("article-back-btn");
    backBtn.onclick = () => {
      // Go back to the subject view
      const firstBranch = article.branches[0];
      location.hash = `#subject/${firstBranch}/${article.semester}/${article.subject}`;
    };
  }

  // Expose togglePracticalCompleted to window since it's used in inline onclick
  window.togglePracticalCompleted = function(subjectCode, pracNum) {
    const key = `${subjectCode}-${pracNum}`;
    state.completedPracticals[key] = !state.completedPracticals[key];
    localStorage.setItem("msbte-completed", JSON.stringify(state.completedPracticals));
    
    // We need to re-render the subject view. We can extract parameters from URL hash.
    if (location.hash.startsWith("#subject/")) {
      const parts = location.hash.split("/");
      renderSubjectView(parts[1], parts[2], parts[3]);
    }
  };

})();

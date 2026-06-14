(() => {
  const branchSel = document.getElementById("admin-branch");
  const semSel = document.getElementById("admin-semester");
  const subSel = document.getElementById("admin-subject");
  const pracSel = document.getElementById("admin-practical");
  const form = document.getElementById("admin-upload-form");
  const statusDiv = document.getElementById("admin-upload-status");
  const solutionsList = document.getElementById("admin-solutions-list");

  // Populate branches
  if (typeof msbteData !== "undefined") {
    msbteData.branches.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.id;
      opt.textContent = `${b.name} (${b.code})`;
      branchSel.appendChild(opt);
    });
  }

  // Branch change
  branchSel.addEventListener("change", () => {
    semSel.disabled = false;
    semSel.value = "";
    subSel.innerHTML = '<option value="" disabled selected>Select Subject</option>';
    subSel.disabled = true;
    pracSel.innerHTML = '<option value="" disabled selected>Select Practical</option>';
    pracSel.disabled = true;
  });

  // Semester change
  semSel.addEventListener("change", () => {
    const branchId = branchSel.value;
    const semNum = semSel.value;
    
    subSel.innerHTML = '<option value="" disabled selected>Select Subject</option>';
    pracSel.innerHTML = '<option value="" disabled selected>Select Practical</option>';
    pracSel.disabled = true;

    if (!branchId || !semNum) return;

    const branch = msbteData.branches.find(b => b.id === branchId);
    if (branch && branch.semesters[semNum]) {
      branch.semesters[semNum].forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub.code;
        opt.textContent = `${sub.name} (${sub.code})`;
        subSel.appendChild(opt);
      });
      subSel.disabled = false;
    }
  });

  // Subject change
  subSel.addEventListener("change", () => {
    const subjectCode = subSel.value;
    pracSel.innerHTML = '<option value="" disabled selected>Select Practical</option>';
    
    if (!subjectCode) {
      pracSel.disabled = true;
      return;
    }

    const branchId = branchSel.value;
    const semNum = semSel.value;
    const branch = msbteData.branches.find(b => b.id === branchId);
    const subject = branch.semesters[semNum].find(s => s.code === subjectCode);

    const pracCount = subject ? subject.practicals : 12;
    for (let i = 1; i <= pracCount; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `Practical ${i}`;
      pracSel.appendChild(opt);
    }
    pracSel.disabled = false;
  });

  // Form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById("admin-file");
    if (!fileInput.files.length) {
      statusDiv.textContent = "Please select a file.";
      statusDiv.style.color = "var(--danger)";
      return;
    }

    const formData = new FormData();
    formData.append("branch", branchSel.value);
    formData.append("semester", semSel.value);
    formData.append("subject", subSel.value);
    formData.append("practical", pracSel.value);
    formData.append("contributor", "Admin");
    formData.append("solution_file", fileInput.files[0]);

    const submitBtn = document.getElementById("admin-submit-btn");
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Uploading...";
    statusDiv.textContent = "";

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const result = await res.json();
      
      if (res.ok) {
        statusDiv.textContent = "Upload successful!";
        statusDiv.style.color = "var(--success)";
        form.reset();
        semSel.disabled = true;
        subSel.disabled = true;
        pracSel.disabled = true;
        fetchSolutions(); // Refresh list
      } else {
        statusDiv.textContent = result.error || "Upload failed.";
        statusDiv.style.color = "var(--danger)";
      }
    } catch (err) {
      statusDiv.textContent = "Network error occurred.";
      statusDiv.style.color = "var(--danger)";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span class="material-icons-round">publish</span> Upload Solution';
    }
  });

  // Fetch Solutions
  async function fetchSolutions() {
    try {
      const res = await fetch("/api/solutions");
      const solutions = await res.json();
      
      if (solutions.length === 0) {
        solutionsList.innerHTML = '<tr><td colspan="3" style="text-align: center;">No solutions uploaded yet.</td></tr>';
        return;
      }

      solutionsList.innerHTML = solutions.map(s => `
        <tr>
          <td><strong>${s.subject}</strong><br><small style="color:var(--text-secondary)">Sem ${s.semester} | ${s.branch.toUpperCase()}</small></td>
          <td>P-${s.practical}</td>
          <td><a href="${s.filePath}" target="_blank" class="btn btn-outline" style="padding: 4px 8px; font-size: 12px; text-decoration: none;">View</a></td>
        </tr>
      `).join('');
    } catch (err) {
      solutionsList.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--danger);">Failed to load solutions.</td></tr>';
    }
  }

  // Init
  fetchSolutions();
})();

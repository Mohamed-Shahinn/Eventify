function register(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const error = document.getElementById("error");
  
    // نفضي أي error قديم
    error.style.display = "none";
    error.innerText = "";
  
    // Basic validation
    if (!username || !password || !fullName || !email || !phone) {
      error.innerText = "All fields are required";
      error.style.display = "block";
      return;
    }
  
    if (password.length < 4) {
      error.innerText = "Password must be at least 4 characters";
      error.style.display = "block";
      return;
    }
  
    // Email format check (simple)
    if (!email.includes("@")) {
      error.innerText = "Please enter a valid email";
      error.style.display = "block";
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check username uniqueness
    if (users.find(u => u.username === username)) {
      error.innerText = "Username already exists";
      error.style.display = "block";
      return;
    }
  
    const user = {
      username,
      password, // مؤقتًا plain text (هيتحول Hash في PHP)
      fullName,
      email,
      phone,
      createdAt: new Date().toISOString()
    };
  
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Account created successfully. Please login.");
    window.location.href = "index.html";
  }
  
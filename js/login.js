function login(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");
  
    // نخفي أي error قديم
    error.style.display = "none";
    error.innerText = "";
  
    if (!username || !password) {
      error.innerText = "Please enter username and password";
      error.style.display = "block";
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    if (users.length === 0) {
      error.innerText = "No users found. Please register first.";
      error.style.display = "block";
      return;
    }
  
    const user = users.find(
      u => u.username === username && u.password === password
    );
  
    if (!user) {
      error.innerText = "Invalid username or password";
      error.style.display = "block";
      return;
    }
  
    // ✅ Login success
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  
    window.location.href = "home.html";
  }
  
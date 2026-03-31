  

  
  document.addEventListener("mousemove", (e) => {
     const cursor = document.getElementById("cursor"); 
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";


      const hideTargets = document.querySelectorAll(".logo, .menu, .nav-cta, .footer-links, .footer-contact");

hideTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.display = "none";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.display = "block";
  });
});
    });



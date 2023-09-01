function nav_btn() {
  var flex = document.getElementsByClassName("nav-links");
  flex[0].classList.toggle("active");
  var img = document.getElementsByClassName("nav-img");
  if (img[0].getAttribute("src") == "Images/menu.png") {
    img[0].setAttribute("src", "Images/close.png");
  } else {
    img[0].setAttribute("src", "Images/menu.png");
  }
}

social = document.getElementsByClassName("social-img");

for (let i = 0; i < social.length; i++) {
  social[i].addEventListener("mouseenter", function () {
    console.log("1");
    var temp = this;
    var source = this.getAttribute("src");

    switch (source) {
      case "Images/email.png":
        temp.setAttribute("src", "Images/email hover.png");
        break;

      case "Images/github.png":
        temp.setAttribute("src", "Images/github hover.png");
        break;

      case "Images/linkedin.png":
        temp.setAttribute("src", "Images/linkedin hover.png");
        break;

      case "Images/instagram.png":
        temp.setAttribute("src", "Images/instagram hover.png");
        break;

      default:
        break;
    }
  });

  social[i].addEventListener("mouseleave", function () {
    console.log("2");
    var temp = this;
    var source = this.getAttribute("src");

    switch (source) {
      case "Images/email hover.png":
        temp.setAttribute("src", "Images/email.png");
        break;

      case "Images/github hover.png":
        temp.setAttribute("src", "Images/github.png");
        break;

      case "Images/linkedin hover.png":
        temp.setAttribute("src", "Images/linkedin.png");
        break;

      case "Images/instagram hover.png":
        temp.setAttribute("src", "Images/instagram.png");
        break;

      default:
        break;
    }
  });
}

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

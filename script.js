// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const navbar = document.getElementById("navbar")

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Active navigation link highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        if (navLink) {
          navLink.classList.add("active")
        }
      }
    })
  }

  window.addEventListener("scroll", updateActiveNavLink)

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".skill-category, .project-card, .certificate-card, .about-paragraph",
  )
  animatedElements.forEach((el) => observer.observe(el))

  // Typing effect for hero subtitle
  function typeWriter(element, text, speed = 100) {
    let i = 0
    element.innerHTML = ""

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }

  // Initialize typing effect
  const heroSpecialization = document.querySelector(".hero-specialization")
  if (heroSpecialization) {
    const originalText = heroSpecialization.textContent
    setTimeout(() => {
      typeWriter(heroSpecialization, originalText, 80)
    }, 1000)
  }

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    if (hero) {
      const rate = scrolled * -0.5
      hero.style.transform = `translateY(${rate}px)`
    }
  })

  // Counter animation for certificates
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
      }
    }

    updateCounter()
  }

  // Initialize counters when certificates section is visible
  const certificatesSection = document.getElementById("certificaciones")
  if (certificatesSection) {
    const certificatesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll(".certificate-hours")
            counters.forEach((counter) => {
              const text = counter.textContent
              const number = Number.parseInt(text.match(/\d+/))
              if (number) {
                animateCounter(counter, number)
              }
            })
            certificatesObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    certificatesObserver.observe(certificatesSection)
  }

  // Project card hover effects
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Skill tag hover effects
  const skillTags = document.querySelectorAll(".skill-tag")
  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
      this.style.boxShadow = "0 5px 15px rgba(102, 126, 234, 0.4)"
    })

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "none"
    })
  })

  // Social links tracking
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const platform = this.href.includes("linkedin")
        ? "LinkedIn"
        : this.href.includes("instagram")
          ? "Instagram"
          : this.href.includes("facebook")
            ? "Facebook"
            : this.href.includes("wa.me")
              ? "WhatsApp"
              : "Unknown"

      console.log(`Clicked on ${platform} link`)
    })
  })

  // Contact button interactions
  const contactButtons = document.querySelectorAll(".contact-buttons .btn")
  contactButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Certificate card click effects
  const certificateCards = document.querySelectorAll(".certificate-card")
  certificateCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(1.02)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 200)
    })
  })

  // Loading animation for page
  window.addEventListener("load", () => {
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s ease-in-out"

    setTimeout(() => {
      document.body.style.opacity = "1"
    }, 100)
  })

  // Scroll to top functionality
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    `

  document.body.appendChild(scrollToTopBtn)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = "1"
      scrollToTopBtn.style.visibility = "visible"
    } else {
      scrollToTopBtn.style.opacity = "0"
      scrollToTopBtn.style.visibility = "hidden"
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  scrollToTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.1)"
    this.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.6)"
  })

  scrollToTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
    this.style.boxShadow = "0 5px 15px rgba(102, 126, 234, 0.4)"
  })

  // Initialize all animations and effects
  console.log("Portfolio loaded successfully!")
})

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Add click event listeners to navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    scrollToSection(targetId)
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
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  // Section headers
  document.querySelectorAll(".section-title").forEach((el) => observer.observe(el))
  document.querySelectorAll(".section-line").forEach((el) => observer.observe(el))
  document.querySelectorAll(".section-subtitle").forEach((el) => observer.observe(el))

  // Feature items
  document.querySelectorAll(".feature-item").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`
    observer.observe(el)
  })

  // Service cards
  document.querySelectorAll(".service-card").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`
    observer.observe(el)
  })

  // Portfolio items
  document.querySelectorAll(".portfolio-item").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.3}s`
    observer.observe(el)
  })

  // Testimonial cards
  document.querySelectorAll(".testimonial-card").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.3}s`
    observer.observe(el)
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.98)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
  }
})

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  const submitButton = e.target.querySelector(".submit-button")
  const originalText = submitButton.innerHTML

  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitButton.disabled = true

  setTimeout(() => {
    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
    submitButton.style.background = "#28a745"

    setTimeout(() => {
      submitButton.innerHTML = originalText
      submitButton.style.background = ""
      submitButton.disabled = false
      e.target.reset()
    }, 2000)
  }, 1500)
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".floating-particles")
  if (parallax) {
    const speed = scrolled * 0.5
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Add typing effect to hero title
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

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start) + "+"
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + "+"
    }
  }

  updateCounter()
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number")
        statNumbers.forEach((stat) => {
          const text = stat.textContent
          const number = Number.parseInt(text.replace(/\D/g, ""))
          if (number && !stat.classList.contains("animated")) {
            stat.classList.add("animated")
            animateCounter(stat, number)
          }
        })
      }
    })
  },
  { threshold: 0.5 },
)

document.addEventListener("DOMContentLoaded", () => {
  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    statsObserver.observe(heroStats)
  }
})

// Add smooth reveal animation for text content
function revealText(element, delay = 0) {
  const text = element.textContent
  const words = text.split(" ")
  element.innerHTML = ""

  words.forEach((word, index) => {
    const span = document.createElement("span")
    span.textContent = word + " "
    span.style.opacity = "0"
    span.style.transform = "translateY(20px)"
    span.style.display = "inline-block"
    span.style.transition = "all 0.6s ease"
    span.style.transitionDelay = `${delay + index * 0.1}s`
    element.appendChild(span)

    setTimeout(() => {
      span.style.opacity = "1"
      span.style.transform = "translateY(0)"
    }, 100)
  })
}

// Initialize text reveal animations
document.addEventListener("DOMContentLoaded", () => {
  const textElements = document.querySelectorAll(".hero-description, .about-text p")
  textElements.forEach((el, index) => {
    observer.observe(el)
    el.addEventListener("animationstart", () => {
      revealText(el, index * 0.2)
    })
  })
})

// Add particle cursor effect
document.addEventListener("mousemove", (e) => {
  const cursor = document.createElement("div")
  cursor.className = "cursor-particle"
  cursor.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        animation: cursorFade 1s ease-out forwards;
    `

  document.body.appendChild(cursor)

  setTimeout(() => {
    cursor.remove()
  }, 1000)
})

// Add cursor fade animation
const style = document.createElement("style")
style.textContent = `
    @keyframes cursorFade {
        0% {
            transform: scale(1);
            opacity: 0.7;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add scroll progress indicator
const scrollProgress = document.createElement("div")
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 9999;
    transition: width 0.1s ease;
`
document.body.appendChild(scrollProgress)

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.offsetHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.style.width = scrollPercent + "%"
})

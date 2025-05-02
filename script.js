// Initialize particles.js
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#6c5ce7",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6c5ce7",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }
})

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle")
const body = document.body

// Check if user has a saved preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  body.classList.add("dark-theme")
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme")

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }
})

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle")
const nav = document.querySelector("nav")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show")
    menuToggle.classList.toggle("active")
  })
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (nav && nav.classList.contains("show") && !e.target.closest("nav") && !e.target.closest(".menu-toggle")) {
    nav.classList.remove("show")
    menuToggle.classList.remove("active")
  }
})

// Tabs System
const tabBtns = document.querySelectorAll(".tab-btn")
const tabPanes = document.querySelectorAll(".tab-pane")

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and panes
    tabBtns.forEach((b) => b.classList.remove("active"))
    tabPanes.forEach((p) => p.classList.remove("active"))

    // Add active class to clicked button and corresponding pane
    btn.classList.add("active")
    const tabId = btn.getAttribute("data-tab")
    document.getElementById(tabId).classList.add("active")
  })
})

// Accordion
const accordionHeaders = document.querySelectorAll(".accordion-header")

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement

    // Close all other accordion items
    const allItems = document.querySelectorAll(".accordion-item")
    allItems.forEach((item) => {
      if (item !== accordionItem && item.classList.contains("active")) {
        item.classList.remove("active")
      }
    })

    // Toggle current item
    accordionItem.classList.toggle("active")
  })
})

// Filter functionality for lab experiments
const filterBtns = document.querySelectorAll(".filter-btn")
const accordionItems = document.querySelectorAll(".accordion-item")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Get filter value
    const filter = btn.getAttribute("data-filter")

    // Filter accordion items
    accordionItems.forEach((item) => {
      if (filter === "all") {
        item.style.display = "block"
      } else {
        const itemType = item.getAttribute("data-type")
        if (itemType === filter) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      }
    })

    // Close all accordion items
    accordionItems.forEach((item) => {
      item.classList.remove("active")
    })

    // Open the first visible item
    const visibleItems = Array.from(accordionItems).filter((item) => item.style.display !== "none")

    if (visibleItems.length > 0) {
      visibleItems[0].classList.add("active")
    }
  })
})

// Back to Top Button
const backToTopBtn = document.getElementById("backToTopBtn")

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.opacity = "1"
    backToTopBtn.style.transform = "scale(1)"
    backToTopBtn.style.pointerEvents = "auto"
  } else {
    backToTopBtn.style.opacity = "0"
    backToTopBtn.style.transform = "scale(0.8)"
    backToTopBtn.style.pointerEvents = "none"
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Animate stats counter
const statValues = document.querySelectorAll(".stat-value")

function animateCounter(el) {
  const target = Number.parseInt(el.getAttribute("data-count"))
  const duration = 2000 // 2 seconds
  const step = target / (duration / 16) // 60fps
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= target) {
      clearInterval(timer)
      el.textContent = target
    } else {
      el.textContent = Math.floor(current)
    }
  }, 16)
}

// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("stat-value")) {
          animateCounter(entry.target)
        } else {
          entry.target.classList.add("animate")
        }
        observer.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
  },
)

// Observe elements for animation
statValues.forEach((stat) => {
  observer.observe(stat)
})

// Observe sections for animation
const sections = document.querySelectorAll(".section, .concept-section, .accordion-item")
sections.forEach((section) => {
  observer.observe(section)
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      if (nav && nav.classList.contains("show")) {
        nav.classList.remove("show")
        menuToggle.classList.remove("active")
      }
    }
  })
})

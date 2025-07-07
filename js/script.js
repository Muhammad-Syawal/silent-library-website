document.addEventListener("DOMContentLoaded", function () {
  // Initialize all interactive components
  initializeBookSearch();
  initializeBookFilters();
  initializeEventFilters();
  initializeContactForm();
  initializeScrollToTop();
  initializeBookDetailFunctionality();
  initializeCarousel();
  initializeNavigation();
  initializeSmoothScrolling();
});

function initializeBookSearch() {
  const searchInput = document.getElementById("bookSearch");
  const searchBtn = document.getElementById("searchBtn");
  const bookItems = document.querySelectorAll(".book-item");
  const noResults = document.getElementById("noResults");

  if (searchInput && bookItems.length > 0) {
    function performSearch() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      bookItems.forEach((item) => {
        const title =
          item.querySelector(".card-title")?.textContent.toLowerCase() || "";
        const author =
          item.querySelector(".text-muted")?.textContent.toLowerCase() || "";
        const description =
          item.querySelector(".card-text")?.textContent.toLowerCase() || "";

        const matches =
          title.includes(searchTerm) ||
          author.includes(searchTerm) ||
          description.includes(searchTerm);

        if (matches || searchTerm === "") {
          item.style.display = "block";
          visibleCount++;
        } else {
          item.style.display = "none";
        }
      });

      if (noResults) {
        noResults.style.display =
          visibleCount === 0 && searchTerm !== "" ? "block" : "none";
      }
    }

    searchInput.addEventListener("input", performSearch);
    if (searchBtn) {
      searchBtn.addEventListener("click", performSearch);
    }

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    });
  }
}

function initializeBookFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  const bookItems = document.querySelectorAll(".book-item");
  const noResults = document.getElementById("noResults");

  if (filterButtons.length > 0 && bookItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        let visibleCount = 0;
        bookItems.forEach((item) => {
          const category = item.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            item.style.display = "block";
            visibleCount++;
          } else {
            item.style.display = "none";
          }
        });

        if (noResults) {
          noResults.style.display = visibleCount === 0 ? "block" : "none";
        }
      });
    });
  }
}

function initializeEventFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  const eventItems = document.querySelectorAll(".event-item");
  const noEvents = document.getElementById("noEvents");

  if (filterButtons.length > 0 && eventItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        let visibleCount = 0;
        eventItems.forEach((item) => {
          const categories = item.getAttribute("data-category").split(" ");

          if (filter === "all" || categories.includes(filter)) {
            item.style.display = "block";
            visibleCount++;
          } else {
            item.style.display = "none";
          }
        });

        if (noEvents) {
          noEvents.style.display = visibleCount === 0 ? "block" : "none";
        }
      });
    });
  }
}

function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (contactForm.checkValidity() === false) {
        e.stopPropagation();
        contactForm.classList.add("was-validated");
        return;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.innerHTML =
        '<i class="bi bi-hourglass-split me-2"></i>Sending...';
      submitButton.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        contactForm.classList.remove("was-validated");

        if (successMessage) {
          successMessage.style.display = "block";
          successMessage.scrollIntoView({ behavior: "smooth" });
        }

        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        setTimeout(() => {
          if (successMessage) {
            successMessage.style.display = "none";
          }
        }, 5000);
      }, 1500);
    });

    const inputs = contactForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        if (this.checkValidity()) {
          this.classList.remove("is-invalid");
          this.classList.add("is-valid");
        } else {
          this.classList.remove("is-valid");
          this.classList.add("is-invalid");
        }
      });
    });
  }
}

function initializeScrollToTop() {
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
  scrollButton.className = "btn btn-primary position-fixed";
  scrollButton.style.cssText = `
        bottom: 30px;
        right: 30px;
        z-index: 1050;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
  scrollButton.setAttribute("aria-label", "Scroll to top");

  document.body.appendChild(scrollButton);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  });

  scrollButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initializeBookDetailFunctionality() {
  const borrowBtn = document.getElementById("borrowBtn");
  const reserveBtn = document.getElementById("reserveBtn");
  const wishlistBtn = document.getElementById("wishlistBtn");

  if (borrowBtn) {
    borrowBtn.addEventListener("click", function () {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="bi bi-check-circle me-2"></i>Borrowed!';
      this.classList.remove("btn-primary");
      this.classList.add("btn-success");
      this.disabled = true;

      setTimeout(() => {
        alert(
          "Book successfully borrowed! Please visit the library to collect it."
        );
      }, 500);
    });
  }

  if (reserveBtn) {
    reserveBtn.addEventListener("click", function () {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="bi bi-check-circle me-2"></i>Reserved!';
      this.classList.remove("btn-outline-primary");
      this.classList.add("btn-outline-success");
      this.disabled = true;

      setTimeout(() => {
        alert(
          "Book successfully reserved! We'll notify you when it's available."
        );
      }, 500);
    });
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", function () {
      const isAdded = this.classList.contains("btn-outline-danger");

      if (isAdded) {
        this.innerHTML = '<i class="bi bi-heart me-2"></i>Add to Wishlist';
        this.classList.remove("btn-outline-danger");
        this.classList.add("btn-outline-secondary");
      } else {
        this.innerHTML =
          '<i class="bi bi-heart-fill me-2"></i>Added to Wishlist';
        this.classList.remove("btn-outline-secondary");
        this.classList.add("btn-outline-danger");
      }
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  if (bookId && window.location.pathname.includes("book-detail.html")) {
    loadBookDetails(bookId);
  }
}

function loadBookDetails(bookId) {
  const books = {
    1: {
      title: "Elon Musk",
      author: "Walter Isaacson",
      image: "images/elon-musk.JPG",
      genre: "Non-Fiction",
      year: "2023",
      isbn: "9781982181284",
      publisher: "Simon & Schuster",
      pages: "670",
      language: "English",
      shortDescription:
        "This biography details Elon Musks journey, from bullied child to a visionary in EVs, space, and AI. It explores his driven, complex nature shaped by his past.",
      detailedDescription:
        "The #1 New York Times and global bestseller from Walter Isaacson—the acclaimed author of Steve Jobs, Einstein: His Life and World, Benjamin Franklin, and Leonardo da Vinci—is the astonishingly intimate story of the most fascinating, controversial innovator of modern times. For two years, Isaacson shadowed Elon Musk as he executed his vision for electric vehicles at Tesla, space exploration with SpaceX, the AI revolution, and the takeover of Twitter and its conversion to X. The result is the definitive portrait of the mercurial pioneer that offers clues to his political instincts, future ambitions, and overall worldview.  When Elon Musk was a kid in South Africa, he was regularly beaten by bullies. One day a group pushed him down some concrete steps and kicked him until his face was a swollen ball of flesh. He was in the hospital for a week. But the physical scars were minor compared to the emotional ones inflicted by his father, an engineer, rogue, and charismatic fantasist.  His father impact on his psyche would linger. He developed into a tough yet vulnerable man-child, prone to abrupt Jekyll-and-Hyde mood swings, with an exceedingly high tolerance for risk, a craving for drama, an epic sense of mission, and a maniacal intensity that was callous and at times destructive.  At the beginning of 2022—after a year marked by SpaceX launching thirty-one rockets into orbit, Tesla selling a million cars, and him becoming the richest man on earth—Musk spoke ruefully about his compulsion to stir up dramas. “I need to shift my mindset away from being in crisis mode, which it has been for about fourteen years now, or arguably most of my life,” he said.  It was a wistful comment, not a New Year resolution. Even as he said it, he was secretly buying up shares of Twitter, the world ultimate playground. Over the years, whenever he was in a dark place, his mind went back to being bullied on the playground. Now he had the chance to own the playground.  For two years, Isaacson shadowed Musk, attended his meetings, walked his factories with him, and spent hours interviewing him, his family, friends, coworkers, and adversaries. The result is the revealing inside story, filled with amazing tales of triumphs and turmoil, that addresses the question: are the demons that drive Musk also what it takes to drive innovation and progress?",
    },
    2: {
      title: "Hackers Heroes of the Computer Revolution",
      author: "Steven Levy",
      image: "images/heroes-of-the-computer-revolution.jpg",
      genre: "Technology",
      year: "2010",
      isbn: "9781449393748",
      publisher: "O'Reilly Media",
      pages: "520",
      language: "English",
      shortDescription:
        'Steven Levy\'s "Hackers" traces early computer pioneers, their ethics, and impact from the 1950s to the digital age.',
      detailedDescription:
        "This 25th anniversary edition of Steven Levy's classic book traces the exploits of the computer revolution's original hackers -- those brilliant and eccentric nerds from the late 1950s through the early '80s who took risks, bent the rules, and pushed the world in a radical new direction. With updated material from noteworthy hackers such as Bill Gates, Mark Zuckerberg, Richard Stallman, and Steve Wozniak, Hackers is a fascinating story that begins in early computer research labs and leads to the first home computers. Levy profiles the imaginative brainiacs who found clever and unorthodox solutions to computer engineering problems. They had a shared sense of values, known as \"the hacker ethic,\" that still thrives today. Hackers captures a seminal period in recent history when underground activities blazed a trail for today's digital world, from MIT students finagling access to clunky computer-card machines to the DIY culture that spawned the Altair and the Apple II.",
    },
    3: {
      title: "Modern Literature",
      author: "Emily Roberts",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "Fiction",
      year: "2023",
      isbn: "9781234567890",
      publisher: "Literary Press",
      pages: "345",
      language: "English",
      shortDescription:
        "A curated collection of contemporary literary works that define our current era.",
      detailedDescription:
        "Modern Literature presents a carefully curated collection of contemporary literary works that capture the essence of our current era. This anthology features diverse voices from around the world, exploring themes of identity, technology, globalization, and human connection in the 21st century. Each piece has been selected for its artistic merit and relevance to contemporary issues, making this collection an essential read for literature enthusiasts and students alike.",
    },
    4: {
      title: "The Last Guardian",
      author: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "Fiction",
      year: "2022",
      isbn: "9782345678901",
      publisher: "Fantasy Worlds Publishing",
      pages: "487",
      language: "English",
      shortDescription:
        "An epic fantasy adventure that takes readers through mystical realms and ancient prophecies.",
      detailedDescription:
        "The Last Guardian is an epic fantasy adventure that transports readers to a world where magic and reality intertwine. Follow the journey of a reluctant hero who must navigate mystical realms, face ancient prophecies, and confront dark forces threatening to destroy everything they hold dear. With richly developed characters, intricate world-building, and a compelling narrative, this novel offers an unforgettable escape into a realm of wonder and danger.",
    },
    5: {
      title: "Science Discoveries",
      author: "Dr. Anna Wilson",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "Science",
      year: "2024",
      isbn: "9783456789012",
      publisher: "Academic Science Press",
      pages: "298",
      language: "English",
      shortDescription:
        "Fascinating insights into the latest scientific breakthroughs and discoveries.",
      detailedDescription:
        "Science Discoveries offers fascinating insights into the latest scientific breakthroughs and discoveries that are shaping our understanding of the world. From cutting-edge research in quantum physics to revolutionary advances in biotechnology, this book explores the frontiers of scientific knowledge. Written in accessible language, it makes complex scientific concepts understandable to general readers while maintaining scientific accuracy.",
    },
    6: {
      title: "Quantum Physics Made Simple",
      author: "Prof. David Lee",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "Science",
      year: "2023",
      isbn: "9784567890123",
      publisher: "University Science Books",
      pages: "412",
      language: "English",
      shortDescription:
        "Understanding the fundamental principles of quantum mechanics for beginners.",
      detailedDescription:
        "Quantum Physics Made Simple demystifies the complex world of quantum mechanics, making it accessible to beginners and non-specialists. Professor David Lee guides readers through the fundamental principles of quantum physics, from wave-particle duality to quantum entanglement, using clear explanations, practical examples, and minimal mathematics. This book is perfect for anyone curious about the strange and fascinating world of quantum mechanics.",
    },
    7: {
      title: "Ancient Civilizations",
      author: "Dr. Robert Taylor",
      image:
        "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "History",
      year: "2023",
      isbn: "9785678901234",
      publisher: "Historical Studies Press",
      pages: "678",
      language: "English",
      shortDescription:
        "A comprehensive exploration of the world's greatest ancient civilizations and their legacies.",
      detailedDescription:
        "Ancient Civilizations provides a comprehensive exploration of the world's greatest ancient civilizations and their lasting legacies. From the pyramids of Egypt to the philosophy of ancient Greece, from the engineering marvels of Rome to the wisdom of ancient China, this book examines the achievements, cultures, and influence of these remarkable societies. Rich with archaeological evidence and historical analysis, it offers insights into how these civilizations continue to shape our modern world.",
    },
    8: {
      title: "World War Stories",
      author: "Margaret Brown",
      image:
        "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "History",
      year: "2022",
      isbn: "9786789012345",
      publisher: "War History Publications",
      pages: "523",
      language: "English",
      shortDescription:
        "Personal accounts and historical analysis of the major conflicts that shaped the 20th century.",
      detailedDescription:
        "World War Stories presents a compelling collection of personal accounts and historical analysis of the major conflicts that shaped the 20th century. Through letters, diaries, interviews, and historical documents, this book brings to life the human experiences of war. Margaret Brown weaves together these personal narratives with broader historical context, offering readers a deeper understanding of how these conflicts affected individuals, communities, and nations.",
    },
    9: {
      title: "The Innovators",
      author: "Walter Isaacson",
      image:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "Biography",
      year: "2014",
      isbn: "9781476708706",
      publisher: "Simon & Schuster",
      pages: "560",
      language: "English",
      shortDescription:
        "The stories behind the digital revolution and the people who made it happen.",
      detailedDescription:
        "Walter Isaacson's The Innovators tells the story of the people who created the computer and the Internet. It is destined to be the standard history of the digital revolution and an indispensable guide to how innovation really happens. What were the talents that allowed certain inventors and entrepreneurs to turn their visionary ideas into disruptive realities? What led to their creative leaps? Why did some succeed and others fail? In his masterly saga, Isaacson begins with Ada Lovelace, Lord Byron's daughter, who pioneered computer programming in the 1840s. He explores the fascinating personalities that created our current digital revolution, such as Vannevar Bush, Alan Turing, John von Neumann, J.C.R. Licklider, Doug Engelbart, Robert Noyce, Bill Gates, Steve Wozniak, Steve Jobs, Tim Berners-Lee, and Larry Page. This is the story of how their minds worked and what made them so inventive. It's also a narrative of how their ability to collaborate and master the art of teamwork made them even more creative.",
    },
    10: {
      title: "Psychology Today",
      author: "Dr. Lisa Anderson",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "Non-Fiction",
      year: "2024",
      isbn: "978-0987654321",
      publisher: "Academic Press",
      pages: "425",
      language: "English",
      shortDescription:
        "Understanding human behavior and mental processes in the modern world.",
      detailedDescription:
        "A comprehensive guide to modern psychology that explores human behavior, cognitive processes, and mental health in today's rapidly changing world. This book covers the latest research in psychology, neuroscience, and behavioral studies, making complex concepts accessible to both students and general readers interested in understanding the human mind.",
    },
    11: {
      title: "Environmental Science",
      author: "Dr. James Green",
      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "Non-Fiction",
      year: "2024",
      isbn: "978-0555666777",
      publisher: "Nature Publishing",
      pages: "520",
      language: "English",
      shortDescription:
        "A comprehensive guide to understanding our planet's ecosystems and environmental challenges.",
      detailedDescription:
        "This comprehensive textbook covers the fundamental principles of environmental science, including ecology, atmospheric science, soil science, geology, and geography. It examines the complex interactions between the natural systems and human activities that affect our environment. The book addresses current environmental challenges such as climate change, biodiversity loss, pollution, and sustainable resource management, providing readers with the knowledge needed to understand and address these critical issues.",
    },
    12: {
      title: "AI and Machine Learning",
      author: "Dr. Kevin Zhang",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      genre: "Technology",
      year: "2024",
      isbn: "9787890123456",
      publisher: "Tech Innovation Press",
      pages: "467",
      language: "English",
      shortDescription:
        "An introduction to artificial intelligence and its applications in modern society.",
      detailedDescription:
        "AI and Machine Learning provides a comprehensive introduction to artificial intelligence and its rapidly expanding applications in modern society. Dr. Kevin Zhang explains complex AI concepts in accessible terms, covering everything from basic machine learning algorithms to advanced neural networks and deep learning. The book explores real-world applications across industries including healthcare, finance, transportation, and entertainment, while also addressing ethical considerations and future implications of AI technology.",
    },
  };

  const book = books[bookId];
  if (book) {
    updateBookDetail("bookTitle", book.title);
    updateBookDetail("bookAuthor", "by " + book.author);
    updateBookDetail("bookCover", book.image, "src");
    updateBookDetail("bookGenre", book.genre);
    updateBookDetail("publicationYear", book.year);
    updateBookDetail("isbn", book.isbn);
    updateBookDetail("publisher", book.publisher);
    updateBookDetail("pages", book.pages);
    updateBookDetail("language", book.language);
    updateBookDetail("shortDescription", book.shortDescription);

    const detailedDescElement = document.getElementById("detailedDescription");
    if (detailedDescElement) {
      detailedDescElement.innerHTML = "<p>" + book.detailedDescription + "</p>";
    }
  }
}

function updateBookDetail(elementId, value, attribute = "textContent") {
  const element = document.getElementById(elementId);
  if (element) {
    if (attribute === "textContent") {
      element.textContent = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
}

function initializeCarousel() {
  const carousel = document.querySelector("#featuredCarousel");
  if (carousel) {
    const carouselInstance = new bootstrap.Carousel(carousel, {
      interval: 5000,
      wrap: true,
    });

    carousel.addEventListener("mouseenter", () => {
      carouselInstance.pause();
    });

    carousel.addEventListener("mouseleave", () => {
      carouselInstance.cycle();
    });
  }
}

function initializeNavigation() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navLinks2 = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks2.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}

function initializeSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const offsetTop = target.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

function showLoading(element) {
  if (element) {
    element.classList.add("loading");
  }
}

function hideLoading(element) {
  if (element) {
    element.classList.remove("loading");
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Local storage not available:", error);
  }
}

function getFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn("Error reading from local storage:", error);
    return null;
  }
}

function announceToScreenReader(message) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
});

window.addEventListener("load", function () {
  const loadTime = performance.now();
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

window.SilentLibrary = {
  showLoading,
  hideLoading,
  debounce,
  formatDate,
  saveToLocalStorage,
  getFromLocalStorage,
  announceToScreenReader,
};

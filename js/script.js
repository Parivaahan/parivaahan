 document.addEventListener('DOMContentLoaded', () => {
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        // Adjust scroll position for fixed header
                        const headerOffset = 70; // Height of your fixed navbar
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Mobile menu toggle (already present and functional)
            const mobileMenuBtn = document.querySelector('.navbar-toggler');
            const navLinksCollapse = document.getElementById('navbarNav'); // Get the collapsible element

            mobileMenuBtn.addEventListener('click', function() {
                navLinksCollapse.classList.toggle('show');
            });

            // 1. Highlight Active Navigation Link on Scroll
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

            window.addEventListener('scroll', () => {
                let current = '';

                sections.forEach(section => {
                    // Get the section's position relative to the viewport
                    const sectionRect = section.getBoundingClientRect();
                    const sectionTop = sectionRect.top + window.pageYOffset - 70; // Adjust for fixed navbar height
                    const sectionHeight = sectionRect.height; // Use rect.height for more accurate height

                    // Check if the section is within the visible part of the viewport
                    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active'); // Remove active from all
                    // Check if the link's href contains the current section's ID
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active'); // Add active to the corresponding link
                    }
                });
            });

            // Ensure 'Home' link is active on initial load if at the top
            // This is a simple check; adjust if your initial view isn't always at the very top.
            if (window.pageYOffset === 0) {
                document.querySelector('.navbar-nav .nav-link[href="#home"]').classList.add('active');
            }


            // 2. "Back to Top" Button
            const backToTopBtn = document.getElementById('backToTopBtn');

            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) { // Show button after scrolling 300px
                    backToTopBtn.style.display = 'flex'; // Use 'flex' for the button style to center icon
                } else {
                    backToTopBtn.style.display = 'none';
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });


            // 3. Form Submission Feedback (Contact Form)
            const contactForm = document.querySelector('#contact form');

            if (contactForm) {
                contactForm.addEventListener('submit', async (e) => {
                    e.preventDefault(); // Prevent default form submission

                    const submitButton = contactForm.querySelector('button[type="submit"]');
                    const originalButtonText = submitButton.textContent;

                    // Simple client-side validation
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const subject = document.getElementById('subject').value;
                    const message = document.getElementById('message').value;

                    if (!name || !email || !subject || !message) {
                        // Consider using Bootstrap's form validation feedback for better UX
                        alert('Please fill in all required fields.');
                        return;
                    }

                    // Disable button and show loading state
                    submitButton.disabled = true;
                    submitButton.textContent = 'Sending...';

                    // --- IMPORTANT: This is a placeholder for your backend API call ---
                    // In a real application, you would send this data to your backend API
                    // using fetch or XMLHttpRequest.
                    try {
                        // Replace '/api/contact' with your actual server endpoint
                        const response = await fetch('/api/contact', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ name, email, subject, message })
                        });

                        if (response.ok) {
                            alert('Message sent successfully! We will get back to you soon.');
                            contactForm.reset(); // Clear form fields on success
                        } else {
                            // Attempt to parse error message from server response
                            const errorData = await response.json();
                            alert(`Failed to send message: ${errorData.message || 'Server error occurred.'}`);
                        }
                    } catch (error) {
                        console.error('Error submitting form:', error);
                        alert('An unexpected error occurred. Please try again later.');
                    } finally {
                        // Re-enable button and restore text
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                    }
                });
            }
        });
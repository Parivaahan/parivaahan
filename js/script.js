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


// js/script.js - MINIMAL TEST FOR MODAL BUTTON

document.addEventListener('DOMContentLoaded', function () {
    // Log to console to confirm this script starts running
    console.log("script.js has loaded and DOM is ready.");

    // Get references to the elements
    const stateSelect = document.getElementById('stateSelect');
    const proceedToDetailsButton = document.getElementById('proceedToDetailsButton'); // IMPORTANT: Check this ID against your HTML
    const stateSelectionModalElement = document.getElementById('stateSelectionModal');

    // Log elements to confirm they are found
    console.log("stateSelect element:", stateSelect);
    console.log("proceedToDetailsButton element:", proceedToDetailsButton);
    console.log("stateSelectionModal element:", stateSelectionModalElement);

    // Simple function to enable/disable button
    function updateProceedButtonState() {
        if (stateSelect && proceedToDetailsButton) { // Ensure elements exist
            if (stateSelect.value && stateSelect.value !== "Select a state...") {
                proceedToDetailsButton.disabled = false;
                console.log("Proceed button ENABLED.");
            } else {
                proceedToDetailsButton.disabled = true;
                console.log("Proceed button DISABLED.");
            }
        } else {
            console.log("Warning: stateSelect or proceedToDetailsButton not found.");
        }
    }

    // Add event listeners ONLY if elements are found
    if (stateSelect && proceedToDetailsButton) {
        // Set initial state
        updateProceedButtonState();

        // Listen for changes in the dropdown
        stateSelect.addEventListener('change', updateProceedButtonState);
        console.log("Change listener attached to stateSelect.");

        // Listen for clicks on the proceed button
        proceedToDetailsButton.addEventListener('click', function(event) {
            event.preventDefault(); // Stop default form behavior
            console.log("Proceed button CLICKED!"); // LOG THIS TO CONSOLE

            const selectedState = stateSelect.value;

            if (selectedState && selectedState !== "Select a state...") {
                console.log(`State selected: ${selectedState}. About to show alert.`);
                alert(`TEST: You selected ${selectedState}. Click OK to try redirect.`);

                // After OK, this should run
                console.log("Alert dismissed. Attempting redirect...");
                window.location.href = `vehicle_details.html?state=${encodeURIComponent(selectedState)}`;
            } else {
                console.log("No state selected, or default option chosen.");
                alert("TEST: Please select a state.");
                proceedToDetailsButton.disabled = true;
            }
        });
        console.log("Click listener attached to proceedToDetailsButton.");
    } else {
        console.error("CRITICAL ERROR: stateSelect or proceedToDetailsButton element(s) not found in the DOM.");
    }
});


const rtoData = {
    "Andhra Pradesh": [
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna",
        "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam",
        "Vizianagaram", "West Godavari", "YSR Kadapa" // YSR Kadapa is the official name for Kadapa
    ],
    "Arunachal Pradesh": [
        "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang",
        "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding",
        "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai",
        "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang",
        "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
    ],
    "Assam": [
        "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar",
        "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri",
        "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi",
        "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup Rural", "Karbi Anglong",
        "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon",
        "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar",
        "Tamulpur", "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    "Bihar": [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai",
        "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran",
        "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur",
        "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura",
        "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada",
        "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur",
        "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan",
        "Supaul", "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
        "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara",
        "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg",
        "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham (Kawardha)",
        "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund",
        "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon",
        "Sukma", "Surajpur", "Surguja"
    ],
    "Goa": [
        "North Goa", "South Goa"
    ],
    "Gujarat": [
        "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha",
        "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod",
        "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar",
        "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana",
        "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan",
        "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar",
        "Tapi", "Valsad", "Vadodara"
    ],
    "Haryana": [
        "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad",
        "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal",
        "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal",
        "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa",
        "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
        "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur",
        "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur",
        "Solan", "Una"
    ],
    "Jharkhand": [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka",
        "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla",
        "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar",
        "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi",
        "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
    ],
    "Karnataka": [
        "Bagalkot", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru Rural", "Bengaluru Urban",
        "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga",
        "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Kalaburagi (Gulbarga)",
        "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal",
        "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga (Shimoga)",
        "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura (Bijapur)", "Yadgir"
    ],
    "Kerala": [
        "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod",
        "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad",
        "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
    ],
    "Madhya Pradesh": [
        "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat",
        "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur",
        "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas",
        "Dhar", "Dindori", "Guna", "Gwalior", "Harda",
        "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni",
        "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena",
        "Narsinghpur", "Neemuch", "Niwaru", "Panna", "Raisen",
        "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna",
        "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur",
        "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain",
        "Umaria", "Vidisha"
    ],
    "Maharashtra": [
        "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed",
        "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli",
        "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur",
        "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded",
        "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani",
        "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara",
        "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim",
        "Yavatmal"
    ],
    "Manipur": [
        "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West",
        "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney",
        "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal",
        "Ukhrul"
    ],
    "Meghalaya": [
        "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri-Bhoi",
        "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills",
        "West Khasi Hills", "Eastern West Khasi Hills"
    ],
    "Mizoram": [
        "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib",
        "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip",
        "Saitual"
    ],
    "Nagaland": [
        "Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng",
        "Mokokchung", "Mon", "Niuland", "Noklak", "Peren",
        "Phek", "Shamator", "Tuensang", "Wokha", "Zünheboto"
    ],
    "Odisha": [
        "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak",
        "Boudh", "Cuttack", "Debagarh (Deogarh)", "Dhenkanal", "Gajapati",
        "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi",
        "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)", "Khordha", "Koraput",
        "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada",
        "Puri", "Rayagada", "Sambalpur", "Subarnapur (Sonepur)", "Sundargarh"
    ],
    "Punjab": [
        "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib",
        "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar",
        "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar",
        "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar (Mohali)",
        "Shaheed Bhagat Singh Nagar (Nawanshahr)", "Sri Muktsar Sahib", "Tarn Taran"
    ],
    "Rajasthan": [
        "Ajmer", "Alwar", "Balotra", "Banswara", "Baran",
        "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner",
        "Bundi", "Chittorgarh", "Churu", "Dausa", "Didwana Kuchaman",
        "Dholpur", "Dungarpur", "Ganganagar", "Gangapur City", "Hanumangarh",
        "Jaipur", "Jaipur Rural", "Jaisalmer", "Jalore", "Jhalawar",
        "Jhunjhunu", "Jodhpur", "Jodhpur Rural", "Karauli", "Kotputli Behror",
        "Kota", "Kekri", "Khairthal Tijara", "Neem ka Thana", "Nagaur",
        "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar",
        "Sanchore", "Sawai Madhopur", "Shahpura", "Sikar", "Sirohi",
        "Tonk", "Udaipur"
    ],
    "Sikkim": [
        "Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng"
    ],
    "Tamil Nadu": [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
        "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
        "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
        "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
        "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
        "Thanjavur", "Theni", "Thiruvallur", "Thiruvarur", "Thoothukudi",
        "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvannamalai",
        "Tiruvallur", "Vellore", "Viluppuram", "Virudhunagar"
    ],
    "Telangana": [
        "Adilabad", "Bhadradri Kothagudem", "Hanumakonda", "Hyderabad", "Jagtial",
        "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar",
        "Khammam", "Kumuram Bheem (Asifabad)", "Mahabubabad", "Mahabubnagar", "Mancherial",
        "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda",
        "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla",
        "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad",
        "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
    ],
    "Tripura": [
        "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala",
        "South Tripura", "Unakoti", "West Tripura"
    ],
    "Uttar Pradesh": [
        "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha",
        "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich",
        "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly",
        "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr",
        "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah",
        "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad",
        "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur",
        "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi",
        "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi",
        "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj",
        "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut",
        "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
        "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal",
        "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar",
        "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ],
    "Uttarakhand": [
        "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun",
        "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag",
        "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
    ],
    "West Bengal": [
        "Alipurduar", "Bankura", "Paschim Bardhaman", "Purba Bardhaman", "Birbhum",
        "Cooch Behar", "Dakshin Dinajpur (South Dinajpur)", "Darjeeling", "Hooghly", "Howrah",
        "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda",
        "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur (West Medinipur)", "Purba Medinipur (East Medinipur)",
        "Purulia", "South 24 Parganas", "Uttar Dinajpur (North Dinajpur)"
    ],
    "Andaman and Nicobar Islands": [
        "Nicobar", "North and Middle Andaman", "South Andaman"
    ],
    "Chandigarh": [
        "Chandigarh"
    ],
    "Dadra and Nagar Haveli and Daman and Diu": [
        "Dadra and Nagar Haveli", "Daman", "Diu"
    ],
    "Delhi": [
        "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi",
        "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi",
        "West Delhi"
    ],
    "Jammu and Kashmir": [
        "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda",
        "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam",
        "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban",
        "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
    ],
    "Ladakh": [
        "Kargil", "Leh"
    ],
    "Lakshadweep": [
        "Lakshadweep" // Single district encompassing all islands
    ],
    "Puducherry": [
        "Karaikal", "Mahe", "Puducherry", "Yanam"
    ]
};

        // Helper function to get URL query parameters
        function getQueryParam(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        // Function to check and update the Proceed button's status
        function checkProceedButtonStatus() {
            const regNoEntered = registrationNumberInput.value.trim() !== '';
            const rtoSelected = rtoSelect.value !== '';
            const termsChecked = privacyPolicyCheckbox.checked;
            const regNoOptionSelected = regNoOption.checked;
            const regAuthorityOptionSelected = regAuthorityOption.checked;

            if (regNoOptionSelected) {
                // If "Vehicle Registration No." is selected, check reg number and terms
                finalProceedButton.disabled = !(regNoEntered && termsChecked);
            } else if (regAuthorityOptionSelected) {
                // If "Registering Authority." is selected, check RTO and terms
                finalProceedButton.disabled = !(rtoSelected && termsChecked);
            } else {
                finalProceedButton.disabled = true; // Fallback, should not happen if one is always checked
            }

            // Update button color
            if (!finalProceedButton.disabled) {
                finalProceedButton.classList.remove('custom-proceed-btn'); // Remove custom red
                finalProceedButton.classList.add('btn-primary'); // Add Bootstrap blue
            } else {
                finalProceedButton.classList.remove('btn-primary'); // Remove Bootstrap blue
                finalProceedButton.classList.add('custom-proceed-btn'); // Re-add custom red
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            const selectedState = getQueryParam('state');
            const displayStateElement = document.getElementById('displayState');
            const rtoSelect = document.getElementById('rtoSelect');
            const privacyPolicyCheckbox = document.getElementById('privacyPolicyCheckbox');
            const finalProceedButton = document.getElementById('finalProceedButton');
            const regNoOption = document.getElementById('regNoOption');
            const regAuthorityOption = document.getElementById('regAuthorityOption');
            const registrationNumberInput = document.getElementById('registrationNumberInput');
            const registrationNumberSection = document.getElementById('registrationNumberSection');
            const rtoSelectSection = document.getElementById('rtoSelectSection');
            const stateDisplaySection = document.getElementById('stateDisplaySection');

            // Add event listeners for interactivity
            privacyPolicyCheckbox.addEventListener('change', checkProceedButtonStatus);
            rtoSelect.addEventListener('change', checkProceedButtonStatus);
            registrationNumberInput.addEventListener('input', checkProceedButtonStatus);

            // Handle radio button changes for section visibility
            regNoOption.addEventListener('change', function() {
                if (this.checked) {
                    registrationNumberSection.style.display = 'block';
                    rtoSelectSection.style.display = 'none';
                    stateDisplaySection.style.display = 'none'; 
                    rtoSelect.value = ''; // Reset RTO selection
                    checkProceedButtonStatus();
                }
            });

            regAuthorityOption.addEventListener('change', function() {
                if (this.checked) {
                    registrationNumberSection.style.display = 'none';
                    rtoSelectSection.style.display = 'block';
                    // Show state display only if a state was passed in URL
                    if (selectedState) {
                         stateDisplaySection.style.display = 'block';
                    }
                    registrationNumberInput.value = ''; // Clear registration number
                    checkProceedButtonStatus();
                }
            });

            // Initial load logic based on URL parameter or default radio selected
            if (selectedState) {
                // If state is present, activate "Registering Authority" mode
                regAuthorityOption.checked = true;
                regNoOption.checked = false; // Ensure other radio is not checked
                
                registrationNumberSection.style.display = 'none';
                rtoSelectSection.style.display = 'block';
                stateDisplaySection.style.display = 'block'; // Show state display

                displayStateElement.textContent = selectedState;

                if (rtoData[selectedState]) {
                    // Clear existing options before populating
                    rtoSelect.innerHTML = '<option value="">-- SELECT RTO DISTRICT --</option>';
                    rtoData[selectedState].forEach(district => {
                        const option = document.createElement('option');
                        option.value = district;
                        option.textContent = district;
                        rtoSelect.appendChild(option);
                    });
                } else {
                    rtoSelect.innerHTML = '<option value="">No districts found for this state.</option>';
                    rtoSelect.disabled = true;
                }
            } else {
                // Default behavior if no state is passed (e.g., direct navigation)
                regNoOption.checked = true;
                regAuthorityOption.checked = false;

                registrationNumberSection.style.display = 'block';
                rtoSelectSection.style.display = 'none';
                stateDisplaySection.style.display = 'none'; // No state to display
                rtoSelect.innerHTML = '<option value="">-- SELECT RTO DISTRICT --</option>'; // Clear existing hardcoded options
                rtoSelect.disabled = true; // Disable RTO dropdown if not in RTO mode
            }
            
            // Add an event listener for the "Proceed" button click
            finalProceedButton.addEventListener('click', function() {
                if (!finalProceedButton.disabled) { // Ensure button is not disabled when clicked
                    alert('Registration successfully completed');
                    // You can add more actions here, e.g., redirect to another page
                    // window.location.href = 'success.html'; 
                }
            });

            // Final check on load, considering initial radio button states
            checkProceedButtonStatus();
        });


// action for the proceed button in vehicle details page

 document.addEventListener('DOMContentLoaded', function() {
            const privacyPolicyCheckbox = document.getElementById('privacyPolicyCheckbox');
            const finalProceedButton = document.getElementById('finalProceedButton');

            // Function to update button state and color
            function updateProceedButton() {
                if (privacyPolicyCheckbox.checked) {
                    finalProceedButton.disabled = false;
                    finalProceedButton.classList.remove('custom-proceed-btn'); // Remove custom red
                    finalProceedButton.classList.add('btn-primary'); // Add Bootstrap blue
                } else {
                    finalProceedButton.disabled = true;
                    finalProceedButton.classList.remove('btn-primary'); // Remove Bootstrap blue
                    finalProceedButton.classList.add('custom-proceed-btn'); // Re-add custom red
                }
            }

            // Initial call to set the correct state on page load
            updateProceedButton();

            // Add an event listener to the checkbox
            privacyPolicyCheckbox.addEventListener('change', updateProceedButton);

            // Add an event listener for the "Proceed" button click
            finalProceedButton.addEventListener('click', function() {
                if (!finalProceedButton.disabled) { // Ensure button is not disabled when clicked
                    alert('Registration successfully completed');
                    // You can add more actions here, e.g., redirect to another page
                    // window.location.href = 'success.html'; 
                }
            });
        });

// driving license actions
 document.addEventListener('DOMContentLoaded', function() {
            // Function to get query parameters from the URL
            function getQueryParam(name) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(name);
            }

            const selectedState = getQueryParam('state');
            if (selectedState) {
                console.log('Driving License application for state:', selectedState);
                // You can use this 'selectedState' to display state-specific info on this page if needed
                // For example, update a span if you had one for "State: [State Name]"
            }

            // Add event listener for the Continue button
            const continueButton = document.getElementById('continueButton');
            continueButton.addEventListener('click', function() {
                // Here you would typically go to the next step of the DL application
                // For now, let's just log and you can replace this with your actual next page
                console.log('Continue button clicked. Next step of DL application.');
                alert('Continuing to the next step of Driving License application.');
                // Example: window.location.href = `fill_applicant_details.html?state=${selectedState}`;
            });
        });

//LLR actions
document.addEventListener('DOMContentLoaded', function() {
            // Function to get query parameters from the URL
            function getQueryParam(name) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(name);
            }

            const selectedState = getQueryParam('state');
            const stateNameHeader = document.getElementById('stateNameHeader');
            if (selectedState) {
                stateNameHeader.textContent = selectedState.toUpperCase(); // Display state name in header
            } else {
                stateNameHeader.textContent = "YOUR STATE"; // Default if state not passed
            }

            const learnersLicenceRadio = document.getElementById('holdingLearnersLicence');
            const foreignDLRadio = document.getElementById('holdingForeignDL');
            const defenceDLRadio = document.getElementById('holdingDefenceLicence');

            const learnersDetailsSection = document.getElementById('learnersLicenceDetailsSection');
            const foreignDLDetailsSection = document.getElementById('foreignDLDetailsSection');
            const defenceDLDetailsSection = document.getElementById('defenceDLDetailsSection');

            // Function to show/hide sections based on radio button selection
            function showSelectedSection() {
                learnersDetailsSection.style.display = 'none';
                foreignDLDetailsSection.style.display = 'none';
                defenceDLDetailsSection.style.display = 'none';

                if (learnersLicenceRadio.checked) {
                    learnersDetailsSection.style.display = 'block';
                } else if (foreignDLRadio.checked) {
                    foreignDLDetailsSection.style.display = 'block';
                } else if (defenceDLRadio.checked) {
                    defenceDLDetailsSection.style.display = 'block';
                }
            }

            // Add event listeners to radio buttons
            learnersLicenceRadio.addEventListener('change', showSelectedSection);
            foreignDLRadio.addEventListener('change', showSelectedSection);
            defenceDLRadio.addEventListener('change', showSelectedSection);

            // Initial call to set the correct section on page load
            showSelectedSection();

            // Simple Captcha Logic (for demonstration)
            const captchaTextElement = document.getElementById('captchaText');
            const refreshCaptchaButton = document.getElementById('refreshCaptcha');

            function generateCaptcha() {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let captcha = "";
                for (let i = 0; i < 6; i++) {
                    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return captcha;
            }

            // Set initial captcha
            captchaTextElement.textContent = generateCaptcha();

            // Refresh captcha on button click
            refreshCaptchaButton.addEventListener('click', function() {
                captchaTextElement.textContent = generateCaptcha();
            });

            // OK and Cancel button listeners (for demonstration)
            const okButton = document.getElementById('okButton');
            const cancelButton = document.getElementById('cancelButton');

            okButton.addEventListener('click', function() {
                const enteredCaptcha = document.getElementById('captchaInput').value.trim().toUpperCase();
                const currentCaptcha = captchaTextElement.textContent.trim().toUpperCase();

                if (enteredCaptcha === currentCaptcha) {
                    alert('Details submitted successfully!');
                    // Here you would process the form data (e.g., send to server)
                    // For now, let's just go back to the services page
                    window.location.href = `services.html`; 
                } else {
                    alert('Incorrect Captcha. Please try again.');
                    captchaTextElement.textContent = generateCaptcha(); // Refresh captcha on error
                    document.getElementById('captchaInput').value = ''; // Clear input
                }
            });

            cancelButton.addEventListener('click', function() {
                alert('Application cancelled.');
                window.location.href = `services.html`; // Go back to services page
            });
        });
    
document.addEventListener('DOMContentLoaded', function() {
            // Function to get query parameters from the URL
            function getQueryParam(name) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(name);
            }

            const selectedState = getQueryParam('state');
            if (selectedState) {
                console.log('Driving License application for state:', selectedState);
                // You can use this 'selectedState' to display state-specific info on this page if needed
                // For example, update a span if you had one for "State: [State Name]"
            }

            // Add event listener for the Continue button
            const continueButton = document.getElementById('continueButton');
            continueButton.addEventListener('click', function() {
                // Show the alert first
                alert('Continuing to the next step of Driving License application.');
                
                // After the user clicks OK on the alert, the page will redirect
                // Redirect to the new application page, passing the state
                if (selectedState) {
                    window.location.href = `LLR.html?state=${encodeURIComponent(selectedState)}`;
                } else {
                    window.location.href = `LLR.html`; // Redirect without state if none was found
                }
            });
        });

document.addEventListener('DOMContentLoaded', function() {
            new WOW().init(); // Initialize WOW.js for animations

            const stateSelectionModal = document.getElementById('stateSelectionModal');
            const stateDropdown = document.getElementById('stateDropdown');
            const modalProceedButton = document.getElementById('modalProceedButton');
            const modalServiceType = document.getElementById('modalServiceType');
            let currentServiceTypeForRedirect = ''; // Variable to store which service type triggered the modal

            // Event listener for when the modal is shown
            stateSelectionModal.addEventListener('show.bs.modal', function (event) {
                // Button that triggered the modal
                const button = event.relatedTarget; 
                // Extract info from data-service-type attribute
                currentServiceTypeForRedirect = button.getAttribute('data-service-type'); // Store service type
                
                // Update the modal title based on the service type
                if (currentServiceTypeForRedirect === 'vehicle-registration') {
                    modalServiceType.textContent = 'Vehicle Registration';
                } else if (currentServiceTypeForRedirect === 'driving-license') {
                    modalServiceType.textContent = 'Driving License';
                } else if (currentServiceTypeForRedirect === 'tax-payments') {
                    modalServiceType.textContent = 'Tax Payments';
                } else if (currentServiceTypeForRedirect === 'permits') {
                    modalServiceType.textContent = 'Permits';
                } else if (currentServiceTypeForRedirect === 'enforcement') {
                    modalServiceType.textContent = 'Enforcement';
                } else if (currentServiceTypeForRedirect === 'fancy-number') {
                    modalServiceType.textContent = 'Fancy Number Booking';
                } else {
                    modalServiceType.textContent = 'Services'; // Default
                }

                // Reset dropdown and disable button when modal opens
                stateDropdown.value = '';
                modalProceedButton.disabled = true;
            });

            // Enable/disable modal proceed button based on state selection
            stateDropdown.addEventListener('change', function() {
                modalProceedButton.disabled = this.value === '';
            });

            // Handle the modal's proceed button click
            modalProceedButton.addEventListener('click', function() {
                const selectedState = stateDropdown.value;
                
                if (selectedState) {
                    alert(`You selected ${selectedState} for ${currentServiceTypeForRedirect}. You can now redirect the user to a state-specific page or display relevant information.`);
                    
                    const encodedState = encodeURIComponent(selectedState); 
                    
                    // Conditional redirection based on the service type
                    if (currentServiceTypeForRedirect === 'driving-license') {
                        window.location.href = `driving_license.html?state=${encodedState}`;
                    } else if (currentServiceTypeForRedirect === 'vehicle-registration') {
                        window.location.href = `vehicle_details.html?state=${encodedState}`;
                    }
                    // Add more else if blocks here for other service types if needed
                    else {
                        // Default redirection or handling for other services
                        console.log(`No specific redirection for ${currentServiceTypeForRedirect}.`);
                        // You might still want to redirect to a generic page or close modal
                    }

                } else {
                    alert('Please select a state before proceeding.');
                }
            });
        });

// features actions
 // Smooth scrolling for anchor links (Bootstrap's scrollspy might be used for nav, but this is for general links)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
// contact us page actions
document.addEventListener('DOMContentLoaded', function() {
            // Form submission handling
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Simulate form submission
                setTimeout(function() {
                    contactForm.reset();
                    successMessage.classList.add('show');

                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        successMessage.classList.remove('show');
                    }, 5000);
                }, 1000);
            });
        });

// script.js (or main.js)

document.addEventListener('DOMContentLoaded', function() {

    // --- Common Helper Functions (if any, currently none complex enough to abstract) ---

    // --- Login Form Logic ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) { // Check if the login form exists on the current page
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            console.log('Login Attempt - Username:', username, 'Password:', password);

            // In a real application, you would send this data to a server for authentication
            // Example using fetch API:
            /*
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Login successful!');
                    // Redirect to dashboard or home page
                    // window.location.href = '/dashboard';
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
                alert('An error occurred during login. Please try again.');
            });
            */
            alert('Login attempted for Username: ' + username + '\n(This is a frontend template, no actual login occurs.)');
        });
    }

    // --- Forgot Password Form Logic ---
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) { // Check if the forgot password form exists on the current page
        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const emailOrUsername = document.getElementById('emailOrUsername').value;

            console.log('Forgot Password Request for:', emailOrUsername);

            // In a real application, you would send this data to a server
            // to initiate the password reset process (e.g., send a reset email)
            /*
            fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier: emailOrUsername }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Password reset instructions sent to ' + emailOrUsername + '!');
                    // Optionally redirect to a confirmation page or login page
                    // window.location.href = '/login';
                } else {
                    alert('Failed to send reset instructions: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Error during password reset request:', error);
                alert('An error occurred. Please try again.');
            });
            */
            alert('Password reset instructions requested for: ' + emailOrUsername + '\n(This is a frontend template, no actual reset occurs.)');
        });
    }

    // --- Registration Form Logic ---
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) { // Check if the registration form exists on the current page
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirmPassword');
        const passwordMatchError = document.getElementById('passwordMatchError'); // Assuming this element exists for feedback
        const termsCheck = document.getElementById('termsCheck');

        function validatePasswords() {
            if (passwordField.value !== confirmPasswordField.value) {
                confirmPasswordField.classList.add('is-invalid');
                if (passwordMatchError) { // Ensure the error message element exists
                    passwordMatchError.style.display = 'block';
                }
                return false;
            } else {
                confirmPasswordField.classList.remove('is-invalid');
                if (passwordMatchError) {
                    passwordMatchError.style.display = 'none';
                }
                return true;
            }
        }

        // Real-time password matching validation as user types
        if (passwordField && confirmPasswordField) {
            passwordField.addEventListener('keyup', validatePasswords);
            confirmPasswordField.addEventListener('keyup', validatePasswords);
        }

        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Validate passwords on submit
            if (!validatePasswords()) {
                alert('Please ensure passwords match and correct any errors.');
                return; // Stop form submission if passwords don't match
            }

            // Validate terms checkbox
            if (termsCheck && !termsCheck.checked) {
                alert('You must agree to the Terms and Conditions and Privacy Policy.');
                return; // Stop form submission if terms are not accepted
            }

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const mobile = document.getElementById('mobile') ? document.getElementById('mobile').value : ''; // Mobile might be optional or not exist
            const password = passwordField.value; // In a real app, this would be sent securely (e.g., hashed on backend)

            console.log('Registration Attempt - Full Name:', fullName, 'Email:', email, 'Mobile:', mobile, 'Password (raw for demo):', password);

            // In a real application, you would send this data to a server for user registration
            /*
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, mobile, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Registration successful! Please login.');
                    // Redirect to login page or a success message page
                    // window.location.href = '/login';
                } else {
                    alert('Registration failed: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Error during registration:', error);
                alert('An error occurred during registration. Please try again.');
            });
            */
            alert('Registration attempted for: ' + email + '\n(This is a frontend template, no actual registration occurs.)');
        });
    }
});
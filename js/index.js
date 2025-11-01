function updateHTMLElement(id, value) {
    const element = document.getElementById(id);
    if (element !== null && element !== undefined) {
        element.innerText = value;
    }
}

function getHTMLElement(id) {
    const element = document.getElementById(id);
    return element;
}

function onContactFormSubmitted() {
    const name = getHTMLElement('name').value;
    if (name.va === null || name === undefined || name === '') {
        getHTMLElement('error-message').innerText = 'Your name is required';
        return;
    }
    const email = getHTMLElement('email').value;
    if (email === null || email === undefined || email === '') {
        getHTMLElement('error-message').innerText = 'Your email is required';
        return;
    }
    const prefix = getHTMLElement('prefix').value;
    const phone = getHTMLElement('phone').value;
    if (prefix === null || prefix === undefined || prefix === '') {
        getHTMLElement('error-message').innerText = 'Your prefix is required';
        return;
    } else if (phone === null || phone === undefined || phone === '') {
        getHTMLElement('error-message').innerText = 'Your phone is required';
        return;
    }
    const subject = 'Deni-Begaj Website: Request for discussion from ' + name;
    const message = getHTMLElement('message').value;
    if (message === null || message === undefined || message === '') {
        getHTMLElement('error-message').innerText = 'A message is required to submit inquiry';
        return;
    }
    const nowDate = new Date().toLocaleDateString();
    const fullMessage = 'Request from Website:' + ' \n\n\n' +
                        message + '\n\n\n' +
                        'Visitor Name: ' + name + '\n' +
                        'Visitor Phone:' + encodeURI(prefix + phone) + '\n' +
                        'Inquiry Date: '  + nowDate;
    const mailToString = 'mailto:' + myEmail + '?subject=' + encodeURI(subject) + '&body=' + encodeURI(fullMessage);

    window.open(mailToString, '_blank');
    getHTMLElement('success-message').innerText = 'Your email is ready to be sent. Check the next tab.';
    return false;
}

function addCountryCodesToSelect() {
    const prefixSelect = getHTMLElement('prefix');
    for(const prefix of countryCodes) {
        const option = document.createElement('option');
        option.text = prefix.name + ' (' + prefix.dial_code + ')';
        option.value = prefix.dial_code;
        prefixSelect.add(option);
    }
}


// Age calculation
const birthDate = new Date('1998-02-02');
const yearsDate = new Date ( Date.now() - birthDate ) ;
const years = Math.abs(yearsDate.getUTCFullYear() - 1970);
updateHTMLElement('my-age', years);


// Constants
const myEmail = 'denibegaj98@gmail.com';
const website = 'deni-begaj.github.io';
updateHTMLElement('my-website', website);

const certificates = 11;
updateHTMLElement('my-certificates', certificates);
const customers = 1000;
updateHTMLElement('my-customers', customers);
const projects = 35;
updateHTMLElement('my-projects', projects);
const bugsSolved = 999;
updateHTMLElement('my-bugsSolved', bugsSolved);

addCountryCodesToSelect();

/**
 * Generates portfolio HTML from an array of project objects
 * @param {Array} projects - Array of project objects
 * @param {string} containerId - Optional: ID of container to insert HTML into (default: 'portfolio-grid')
 * @returns {string} - HTML string of portfolio cards
 * 
 * Project object structure:
 * {
 *   title: string (required),
 *   description: string (required),
 *   image: string (required) - main screenshot path,
 *   screenshots: array (optional) - additional screenshot paths,
 *   url: string (optional) - live site URL,
 *   appStoreUrl: string (optional) - App Store/Play Store URL,
 *   tech: array (optional) - technology tags,
 *   categories: array (optional) - ['web', 'mobile', 'desktop'] - defaults to ['web']
 * }
 */
function generatePortfolioHTML(projects, containerId) {
    if (!Array.isArray(projects) || projects.length === 0) {
        console.error('generatePortfolioHTML: projects must be a non-empty array');
        return '';
    }

    const container = containerId || 'portfolio-grid';
    let html = '';

    projects.forEach((project, index) => {
        // Validate required fields
        if (!project.title || !project.description || !project.image) {
            console.warn(`Project at index ${index} is missing required fields (title, description, or image)`);
            return;
        }

        // Generate project ID if not provided
        if (!project.id) {
            project.id = 'project-' + index + '-' + project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }

        // Default categories to ['web'] if not provided
        const categories = project.categories && Array.isArray(project.categories) 
            ? project.categories 
            : ['web'];
        
        // Build data-groups attribute
        const dataGroups = ['all'].concat(categories);
        const dataGroupsStr = JSON.stringify(dataGroups).replace(/"/g, '&quot;');

        // Build technology tags HTML
        let techTagsHTML = '';
        if (project.tech && Array.isArray(project.tech) && project.tech.length > 0) {
            techTagsHTML = '<div class="portfolio-tech">';
            project.tech.forEach(tech => {
                techTagsHTML += '<span>' + escapeHtml(tech) + '</span>';
            });
            techTagsHTML += '</div>';
        }

        // Build the complete portfolio card HTML (clickable, no overlay buttons)
        // Escape project ID for safe use in onclick handler
        const escapedProjectId = project.id.replace(/'/g, "\\'");
        html += '<div class="item" data-groups="' + dataGroupsStr + '">' +
                '<div class="portfolio-card" data-project-id="' + escapeHtml(project.id) + '" onclick="showProjectDetail(\'' + escapedProjectId + '\')">' +
                '<div class="portfolio-image">' +
                '<img alt="' + escapeHtml(project.title) + '" src="' + escapeHtml(project.image) + '">' +
                '</div>' +
                '<div class="portfolio-content">' +
                '<h4>' + escapeHtml(project.title) + '</h4>' +
                '<p>' + escapeHtml(project.description) + '</p>' +
                techTagsHTML +
                '</div></div></div>';
    });

    // If containerId is provided, insert into DOM
    if (containerId) {
        const containerElement = document.getElementById(containerId);
        if (containerElement) {
            containerElement.innerHTML = html;
            
            // Reinitialize portfolio shuffle if jquery.shuffle is available
            if (typeof jQuery !== 'undefined' && jQuery.fn.shuffle) {
                jQuery('#portfolio-grid').shuffle('update');
            }
        } else {
            console.warn(`Container element with ID '${containerId}' not found`);
        }
    }

    return html;
}

/**
 * Helper function to escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

/**
 * Example portfolio projects array
 * Uncomment and modify this to use with generatePortfolioHTML()
 * 
 * Usage:
 *   1. Define your projects array
 *   2. Call: generatePortfolioHTML(portfolioProjects, 'portfolio-grid');
 *   3. Or get HTML string: const html = generatePortfolioHTML(portfolioProjects);
 */

const portfolioProjects = [
    {
        title: 'Novalto Financial Platform',
        description: 'Novalto is a financial platform that provides a data aggregation and analysis service for companies in Albania for different fiscal years. Such reports are used by banks and new corporations wanting to enter the local market.',
        image: 'img/portfolio/novalto/dashboard.png',
        screenshots: ['img/portfolio/novalto/login.png', 'img/portfolio/novalto/dashboard.png', 'img/portfolio/novalto/report.png', 'img/portfolio/novalto/report2.png', 'img/portfolio/novalto/report3.png', 'img/portfolio/novalto/report4.png', 'img/portfolio/novalto/report5.png', 'img/portfolio/novalto/report6.png', 'img/portfolio/novalto/report7.png'],
        tech: ['Node.JS', 'Express.JS', 'SQL Server', 'MongoDB','Angular', 'Material UI'],
        categories: ['web', 'desktop', 'mobile']
    },
    {
        title: 'Albanian Post Mobile App',
        description: 'Cross-platform mobile application for Albanian Post services. Features include package tracking, postal code lookup, office locator, and tariff calculator. Interactive postal code and tariff lookup system integrated into the Albanian Post mobile app with intuitive search and filtering capabilities.',
        image: 'img/portfolio/albpost/4.png',
        screenshots: ['img/portfolio/albpost/4.png', 'img/portfolio/albpost/6.png', 'img/portfolio/albpost/7.png', 'img/portfolio/albpost/8.png'],
        tech: ['iOS', 'Android', 'React Native'],
        appStoreUrl: 'https://play.google.com/store/apps/details?id=com.heliussystems.eposta&hl=sq',
        categories: ['mobile']
    },
    {
        title: 'Meeting Scheduler App',
        description: 'Modern, responsive website for a tech startup featuring services showcase, project portfolio, and contact sections with optimized user experience.',
        image: 'img/portfolio/meeting-agent/3.png',
        screenshots: ['img/portfolio/meeting-agent/3.png'],
        url: 'https://example.com',
        tech: ['Asp.NET', 'C#', 'SQL Server', 'Entity Framework', 'Angular', 'Material UI'],
        categories: ['web','mobile']
    },
    {
        title: 'Data Charts with D3.js',
        description: 'This web-app showcases how we can leverage D3.js Data charts using D3.js to visualize data from the financial platform.',
        image: 'img/portfolio/d3charts/d3-map-chat.gif',
        screenshots: ['img/portfolio/d3charts/d3-map-chat.gif', 'img/portfolio/d3charts/1.png', 'img/portfolio/d3charts/5.png', 'img/portfolio/d3charts/6.png', 'img/portfolio/d3charts/3.png', 'img/portfolio/d3charts/4.png'],
        url: 'https://d3-charts-ruddy.vercel.app/',
        tech: ['d3.js', 'HTML', 'CSS', 'JavaScript'],
        categories: ['web','mobile']
    },
    {
        title: 'Socket Chat from Scratch',
        description: 'Real-time chat application built from scratch using WebSockets. Features include private messaging, group chats, and live notifications.',
        image: 'img/portfolio/socket-chat/1.png',
        screenshots: ['img/portfolio/socket-chat/1.png'],
        tech: ['WebSockets', 'Node.js', 'Express.JS', 'Socket.IO', 'MongoDB'],
        categories: ['web', 'mobile']
    },
    {
        title: 'SQL Server User Schema',
        description: 'Comprehensive database schema design for user management system with role-based access control and profile management.',
        image: 'img/portfolio/db/2.png',
        screenshots: ['img/portfolio/db/2.png'],
        tech: ['SQL Server', 'Database Design', 'RBAC'],
        categories: ['backend', 'architecture']
    },
    {
        title: 'University of Tirana, Faculty of Economics Website',
        description: 'Comprehensive website for the Faculty of Economy featuring academic programs, research information, student resources, and library access.',
        image: 'img/portfolio/feut/9.png',
        screenshots: ['img/portfolio/feut/9.png'],
        url: 'https://feut.edu.al/',
        tech: ['CMS', 'Multi-language', 'Institutional'],
        categories: ['web']
    },
    {
        title: 'Labgom Company Landing Page',
        description: 'Landing page for Labgom company featuring services, projects, and contact information.',
        image: 'img/portfolio/labgom/home.png',
        screenshots: ['img/portfolio/labgom/home.png', 'img/portfolio/labgom/info.png', 'img/portfolio/labgom/footer.png'],
        url: 'https://labgom-landing-page.vercel.app/',
        tech: ['Next.js', 'Tailwind CSS', 'React', 'Material UI'],
        categories: ['web', 'mobile', 'landing page']
    },
    {
        title: 'Luigi\'s Italian Restaurant',
        description: 'Landing page for Luigi\'s Italian Restaurant featuring menu, about us, contact information. This page is mobile friendly and also printable as a pdf.',
        image: 'img/portfolio/luigis/1.png',
        screenshots: ['img/portfolio/luigis/1.png', 'img/portfolio/luigis/2.png', 'img/portfolio/luigis/3.png'],
        url: 'https://luigis-website.vercel.app/',
        tech: ['HTML', 'CSS', 'JavaScript'],
        categories: ['web', 'mobile', 'landing page']
    }
];

// Store projects globally for detail view access
window.portfolioProjectsData = portfolioProjects;

generatePortfolioHTML(portfolioProjects, 'portfolio-grid');

/**
 * Shows the project detail modal for a given project ID
 * @param {string} projectId - The ID of the project to display
 */
function showProjectDetail(projectId) {
    // Find project by ID
    const project = window.portfolioProjectsData.find(function(p) {
        return p.id === projectId;
    });

    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    // Get all images (first image + screenshots)
    const allImages = [project.image];
    if (project.screenshots && Array.isArray(project.screenshots)) {
        allImages.push.apply(allImages, project.screenshots);
    }

    // Set main image (first one)
    const mainImageEl = document.getElementById('project-detail-main-image');
    if (mainImageEl && allImages.length > 0) {
        mainImageEl.src = allImages[0];
        mainImageEl.alt = project.title;
        mainImageEl.onclick = function() {
            // Clicking main image cycles through images or opens lightbox
            if (allImages.length > 1) {
                const currentIndex = allImages.indexOf(mainImageEl.src);
                const nextIndex = (currentIndex + 1) % allImages.length;
                mainImageEl.src = allImages[nextIndex];
            }
        };
    }

    // Build gallery (remaining images)
    const galleryEl = document.getElementById('project-detail-gallery');
    if (galleryEl) {
        galleryEl.innerHTML = '';
        if (allImages.length > 1) {
            allImages.forEach(function(img, index) {
                if (index > 0) { // Skip first image as it's the main one
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.onclick = function() {
                        mainImageEl.src = img;
                    };
                    const imgEl = document.createElement('img');
                    imgEl.src = img;
                    imgEl.alt = project.title + ' - Image ' + (index + 1);
                    galleryItem.appendChild(imgEl);
                    galleryEl.appendChild(galleryItem);
                }
            });
        }
    }

    // Set title
    const titleEl = document.getElementById('project-detail-title');
    if (titleEl) {
        titleEl.textContent = project.title;
    }

    // Set tech tags
    const techEl = document.getElementById('project-detail-tech');
    if (techEl) {
        techEl.innerHTML = '';
        if (project.tech && Array.isArray(project.tech) && project.tech.length > 0) {
            project.tech.forEach(function(tech) {
                const tag = document.createElement('span');
                tag.textContent = tech;
                techEl.appendChild(tag);
            });
        }
    }

    // Set description
    const descEl = document.getElementById('project-detail-description');
    if (descEl) {
        descEl.textContent = project.description;
    }

    // Set categories
    const categoriesEl = document.getElementById('project-detail-categories');
    if (categoriesEl) {
        categoriesEl.innerHTML = '';
        const categories = project.categories && Array.isArray(project.categories) 
            ? project.categories 
            : ['web'];
        
        if (categories.length > 0) {
            const categoriesLabel = document.createElement('span');
            categoriesLabel.className = 'categories-label';
            categoriesLabel.textContent = 'Categories: ';
            categoriesEl.appendChild(categoriesLabel);
            
            categories.forEach(function(category, index) {
                const categoryTag = document.createElement('span');
                categoryTag.className = 'category-tag';
                categoryTag.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categoriesEl.appendChild(categoryTag);
                
                if (index < categories.length - 1) {
                    const separator = document.createTextNode(', ');
                    categoriesEl.appendChild(separator);
                }
            });
        }
    }

    // Build links
    const linksEl = document.getElementById('project-detail-links');
    if (linksEl) {
        linksEl.innerHTML = '';
        
        if (project.url) {
            const link = document.createElement('a');
            link.href = project.url;
            link.target = '_blank';
            link.className = 'project-link';
            link.innerHTML = '<i class="ion-link"></i> Visit Live Site';
            linksEl.appendChild(link);
        }
        
        if (project.appStoreUrl) {
            const link = document.createElement('a');
            link.href = project.appStoreUrl;
            link.target = '_blank';
            link.className = 'project-link';
            link.innerHTML = '<i class="ion-ios-appstore"></i> App Store';
            linksEl.appendChild(link);
        }
        
        if (project.githubUrl) {
            const link = document.createElement('a');
            link.href = project.githubUrl;
            link.target = '_blank';
            link.className = 'project-link';
            link.innerHTML = '<i class="ion-social-github"></i> GitHub';
            linksEl.appendChild(link);
        }
    }

    // Show modal
    const modal = document.getElementById('project-detail-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes the project detail modal
 */
function closeProjectDetail() {
    const modal = document.getElementById('project-detail-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize modal close handlers
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-detail-modal');
    if (modal) {
        // Close button
        const closeBtn = modal.querySelector('.project-detail-close');
        if (closeBtn) {
            closeBtn.onclick = closeProjectDetail;
        }
        
        // Close on overlay click
        const overlay = modal.querySelector('.project-detail-overlay');
        if (overlay) {
            overlay.onclick = closeProjectDetail;
        }
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeProjectDetail();
            }
        });
    }
});
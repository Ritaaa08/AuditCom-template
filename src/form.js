// Form initialization
function initForm() {
  const downloadForm = document.getElementById('downloadForm');
  
  if (!downloadForm) return;

  downloadForm.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const emailInput = form.querySelector('[name="email"]');
  const termsCheckbox = form.querySelector('[name="terms"]');

  // Email validation
  if (!emailInput.value.trim()) {
    showError('L\'email est obligatoire');
    return;
  }

  if (!isValidEmail(emailInput.value)) {
    showError('Veuillez entrer une email valide');
    return;
  }

  // Terms validation
  if (!termsCheckbox.checked) {
    showError('Vous devez accepter les conditions de téléchargement');
    return;
  }

  // Trigger download
  downloadPDF();

  // Show success message
  showSuccess('Téléchargement en cours...');

  // Reset form
  setTimeout(() => {
    form.reset();
  }, 1000);
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Download PDF function
function downloadPDF() {
  const link = document.createElement('a');
  link.href = 'assets/pdf/EcoSystemeDigital_SuisseRomande.pdf';
  link.download = 'EcoSystemeDigital_SuisseRomande.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Show error message
function showError(message) {
  const form = document.getElementById('downloadForm');
  removeMessages();
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-message form-error';
  errorDiv.textContent = message;
  form.insertBefore(errorDiv, form.firstChild);
}

// Show success message
function showSuccess(message) {
  const form = document.getElementById('downloadForm');
  removeMessages();
  
  const successDiv = document.createElement('div');
  successDiv.className = 'form-message form-success';
  successDiv.textContent = message;
  form.insertBefore(successDiv, form.firstChild);
}

// Remove existing messages
function removeMessages() {
  const existingMessages = document.querySelectorAll('.form-message');
  existingMessages.forEach(msg => msg.remove());
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initForm);
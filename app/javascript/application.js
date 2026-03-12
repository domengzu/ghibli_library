// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"


Turbo.config.forms.confirm = (message, element) => {
  const dialog = document.getElementById('confirm-modal');

  if (!dialog) {
    console.error("Confirm modal not found in DOM");
    return Promise.resolve(confirm(message)); // Fallback to native confirm
  }

  const messageElement = dialog.querySelector('[data-message]');
  messageElement.textContent = message;

  dialog.showModal();
  document.body.classList.add('overflow-hidden');

  return new Promise((resolve) => {
    const handleConfirm = () => {
      dialog.close('confirm');
      resolve(true);
    };

    const handleCancel = () => {
      dialog.close('cancel');
      resolve(false);
    };

    const onClose = () => {
      // Resolve false if dialog closed without explicit confirm
      resolve(dialog.returnValue !== 'confirm');
      dialog.removeEventListener('close', onClose);
      dialog.removeEventListener('click', onClick);
      document.body.classList.remove('overflow-hidden');
    };

    const onClick = (event) => {
      if (event.target.matches('[data-behavior="confirm"]')) {
        handleConfirm();
      } else if (event.target.matches('[data-behavior="cancel"]')) {
        handleCancel();
      }
    };

    dialog.addEventListener('click', onClick);
    dialog.addEventListener('close', onClose, { once: true });
  });
};

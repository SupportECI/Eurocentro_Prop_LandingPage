/* Validaciones de casillas*/
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')
  const formulario  = document.forms['contact-form']
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwS0JYhK2xgdU_OnLWT57Oc342PgXVxN2AteKr6Es30zEnWttSEL7ey5588CkY7zN_i/exec'
  const botonEnvio = document.querySelector('button[type="submit"]'); 
  const campoTelefono = formulario.querySelector('input[name="numeroTelefonico"]');
  const codigoAreaPredeterminado = "+52"; 

  // Función para sanitizar el input de texto
  const sanitizeInput = (input) => {
    const element = document.createElement('div');
    element.innerText = input; // Reemplaza el texto con una versión sin tags HTML
    return element.innerHTML;
  };

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        // Validar el número de teléfono
        if (campoTelefono.value.length < 13) {
          campoTelefono.setCustomValidity("número inválido");
        } else {
          campoTelefono.setCustomValidity("");
        }

        form.classList.add('was-validated')

        if (form.checkValidity()){
          event.preventDefault();

          // Sanitizar todos los campos del formulario antes de enviar
          const inputs = formulario.querySelectorAll('input, select, textarea');
          inputs.forEach(input => {
            input.value = sanitizeInput(input.value); // Aplicar sanitización a cada campo
          });

          // Cambia el texto y deshabilita el botón para evitar múltiples envíos
          botonEnvio.textContent = "Enviando su información...";
          botonEnvio.disabled = true;

          fetch(scriptURL, {method: 'POST', body: new FormData(formulario)})
          .then(response => Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Gracias!",
            text: "Un asesor te contactará lo antes posible",
            showConfirmButton: false,
            timer: 2500
          }))
          .then(() => {
            // Limpia el formulario sin recargar la página
            formulario.reset();
            form.classList.remove('was-validated');
            
            // Restaura el código de área en el campo de teléfono
            campoTelefono.value = codigoAreaPredeterminado;

            // Restaura el texto y habilita el botón
            botonEnvio.textContent = "Enviar";
            botonEnvio.disabled = false;
          })
          .catch(error => Swal.fire({
            position: "center",
            icon: "error",
            title: "Hubo un error",
            text: "Favor de contactarnos por WhatsApp",
            showConfirmButton: false,
            timer: 2500
          }))
          .finally(() => {
            botonEnvio.textContent = "Enviar";
            botonEnvio.disabled = false;
          });
        }

      }, false)
  })
})();

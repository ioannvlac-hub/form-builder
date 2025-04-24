class FormBuilder {
 constructor() {
   this.fields = [];
   this.tableHeader = document.querySelector('#dataTable thead');
   this.tableBody = document.querySelector('#dataTable tbody');
   this.form = document.querySelector('#customForm');
   this.modal = document.querySelector('#fieldNameModal');
   this.fieldNameInput = document.querySelector('#fieldNameInput');
   this.fieldOptionsInput = document.querySelector('#fieldOptionsInput');
   this.selectOptionsWrapper = document.querySelector('#selectOptionsWrapper');
   this.fieldNameError = document.querySelector('#fieldNameError');
   this.cancelButton = document.querySelector('#cancelFieldName');
   this.confirmButton = document.querySelector('#confirmFieldName');
   this.addTextFieldButton = document.querySelector('#addTextField');
   this.addSelectFieldButton = document.querySelector('#addSelectField');
   this.saveButton = document.querySelector('#saveForm');

   this.pendingNewFields = [];

   this.addTextFieldButton.addEventListener('click', () => this.openModal('text'));
   this.addSelectFieldButton.addEventListener('click', () => this.openModal('select'));
   this.cancelButton.addEventListener('click', () => this.closeModal());
   this.confirmButton.addEventListener('click', () => this.addField());
   this.saveButton.addEventListener('click', () => this.saveForm());
 }

 openModal(type) {
   this.modal.classList.remove('hidden');
   this.fieldNameInput.value = '';
   this.fieldOptionsInput.value = '';
   this.selectOptionsWrapper.classList.add('hidden');
   this.fieldNameError.classList.add('hidden');

   this.currentFieldType = type;
   if (type === 'select') {
     this.selectOptionsWrapper.classList.remove('hidden');
   }
 }

 closeModal() {
   this.modal.classList.add('hidden');
 }

 addField() {
   const fieldName = this.fieldNameInput.value.trim();
   const fieldType = this.currentFieldType;
   const fieldOptions = this.fieldOptionsInput.value.trim().split(',').map(opt => opt.trim()).filter(opt => opt);

   if (!fieldName) {
     this.fieldNameError.classList.remove('hidden');
     return;
   }

   if (fieldType === 'select' && fieldOptions.length < 2) {
     this.fieldNameError.classList.remove('hidden');
     return;
   }

   const field = { name: fieldName, type: fieldType, options: fieldOptions };
   this.fields.push(field);
   this.pendingNewFields.push(field);

   const formFieldWrapper = document.createElement('div');
   formFieldWrapper.classList.add('mb-4');

   const label = document.createElement('label');
   label.textContent = fieldName;
   label.classList.add('block', 'text-gray-700', 'font-medium');
   formFieldWrapper.appendChild(label);

   let fieldElement;
   if (fieldType === 'text') {
     fieldElement = document.createElement('input');
     fieldElement.type = 'text';
     fieldElement.classList.add('w-full', 'border', 'px-4', 'py-3', 'rounded-lg');
   } else if (fieldType === 'select') {
     fieldElement = document.createElement('select');
     fieldElement.classList.add('w-full', 'border', 'px-4', 'py-3', 'rounded-lg');
     fieldOptions.forEach(option => {
       const optionElement = document.createElement('option');
       optionElement.value = option;
       optionElement.textContent = option;
       fieldElement.appendChild(optionElement);
     });
   }

   formFieldWrapper.appendChild(fieldElement);
   this.form.appendChild(formFieldWrapper);
   this.closeModal();
 }

 saveForm() {
   const formData = [];

   this.fields.forEach((field, index) => {
     const formField = this.form.children[index];
     const inputElement = formField.querySelector('input, select');
     formData.push(inputElement.value.trim() || "-");
   });

   this.pendingNewFields.forEach(field => {
     const th = document.createElement('th');
     th.textContent = field.name;
     th.classList.add('px-4', 'py-3', 'border', 'text-center');
     this.tableHeader.querySelector('tr')?.appendChild(th) ||
       this.tableHeader.appendChild(document.createElement('tr')).appendChild(th);
   });

   if (this.pendingNewFields.length > 0) {
     const numNewCols = this.pendingNewFields.length;
     Array.from(this.tableBody.children).forEach(row => {
       for (let i = 0; i < numNewCols; i++) {
         const td = document.createElement('td');
         td.textContent = "-";
         td.classList.add('px-4', 'py-3', 'border', 'text-center');
         row.appendChild(td);
       }
     });
   }

   const row = document.createElement('tr');
   formData.forEach(data => {
     const td = document.createElement('td');
     td.textContent = data;
     td.classList.add('px-4', 'py-3', 'border', 'text-center');
     row.appendChild(td);
   });
   this.tableBody.appendChild(row);

   this.pendingNewFields = [];
 }
}

new FormBuilder();

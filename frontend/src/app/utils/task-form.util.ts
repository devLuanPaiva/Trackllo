import { FormBuilder, Validators, FormGroup } from '@angular/forms';

export function createTaskForm(fb: FormBuilder): FormGroup {
  return fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    ],
    image: ['', [Validators.pattern(/https?:\/\/.+/)]],
  });
}

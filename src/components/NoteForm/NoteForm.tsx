import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required(),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      validationSchema={validationSchema}
      onSubmit={values => mutation.mutate(values)}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field name="title" className={css.input} />
            {touched.title && errors.title && (
              <span className={css.error}>{errors.title}</span>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              name="content"
              rows={8}
              className={css.textarea}
            />
            {touched.content && errors.content && (
              <span className={css.error}>{errors.content}</span>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={mutation.isLoading}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

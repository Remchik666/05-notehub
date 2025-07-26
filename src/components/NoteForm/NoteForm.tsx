import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { createNote } from '../../services/noteService';
import { useQueryClient } from '@tanstack/react-query';
import type { NoteTag } from '../../types/note';

interface NoteFormValues {
    title: string;
    content: string;
    tag: NoteTag;
}

interface NoteFormProps {
    onSuccess: () => void;
}

const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
};

const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    content: Yup.string().max(500, 'Must be 500 characters or less'),
    tag: Yup.mixed<NoteTag>()
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
        .required('Required'),
});

export default function NoteForm({ onSuccess }: NoteFormProps) {
    const queryClient = useQueryClient();

    const handleSubmit = async (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
        try {
            await createNote(values);
            await queryClient.invalidateQueries({ queryKey: ['notes'] });
            actions.resetForm();
            onSuccess();
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
        {({ isSubmitting, dirty }) => (
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" name="title" type="text" className={css.input} />
                    <ErrorMessage name="title" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field
                        id="content"
                        name="content"
                        as="textarea"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field id="tag" name="tag" as="select" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onSuccess}>Cancel</button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={isSubmitting || !dirty}>Create note</button>
                </div>
            </Form>
        )}
        </Formik>
    );
}
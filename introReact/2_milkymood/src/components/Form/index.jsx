import React from 'react'
import * as Yup from 'yup'
import {Formik, Form, Field} from 'formik'

const FormComponent = ({handleSuccess}) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    email: Yup.string().email('Must be a valid email address').required('Required field')
  })

  return (
    <Formik
      initialValues={{name: '',email: ''}}
      onSubmit={handleSuccess}
      validationSchema={schema}
    >
      {({errors, touched}) => (
        <Form>
          <label>Name: </label>
          <Field type='text' name='name' autoComplete='off' />
          {touched.name && errors && <div>{errors.name}</div> }

          <label>Email Address: </label>
          <Field type='email' name='email' autoComplete='off' />
          {touched.email && errors && <div>{errors.email}</div> }

          <button type="submit">Submit</button>
        </Form>
      )}  
    </Formik>
  )
}

export default FormComponent
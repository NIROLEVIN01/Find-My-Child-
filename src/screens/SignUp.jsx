import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik'
import  axios  from 'axios'
import * as Yup from 'yup' 

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Please enter your first name'),

  lastName: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Please enter your last name'),

  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
    
  password: Yup.string()
    .min(8)
    .required('Please enter your password')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, 
    'Must contain at least 8 chracters, at least one uppercase letter, one lowercase letter, one number and one special character'
    ),

  confirmPassword: Yup.string()
    .min(8, 'must contain at least 8 characters')
    .oneOf([Yup.ref('password')], 'your passwords do NOT match')
    .required('Confirm password is required'),

  phoneNumber: Yup.string()
    .min(10, 'must be 10 digits')
    .max(10, 'must be 10 digits')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('enter your phoneNumber number')
  
})

export default function SignUp() {

  const onSubmit = (values) => {

      axios.post('http://10.195.25.98:4000/users/signup', {
        email: values.email,
        phoneNumber: values.phoneNumber,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        confirmPassword: values.confirmPassword
      })
      .then(data => {Alert.alert('succes'), console.log(data.data);})
    }

  return (
    <Formik initialValues={{
      firstName: '', 
      lastName: '', 
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: ''
    }}
    validationSchema={SignupSchema}
    onSubmit={values => onSubmit(values)}
    >

      {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (

        <View style={styles.container}>
          
          <StatusBar barStyle={'dark-content'} />

          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputStyle} 
              placeholder="First Name" 
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={() => setFieldTouched('firstName')}/>
          </View>

          {touched.firstName && errors.firstName && (
            <Text style={styles.errorTxt}>{errors.firstName}</Text>
          )}

          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputStyle} 
              placeholder="Last Name" 
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={() => setFieldTouched('lastName')}/>
          </View>

          {touched.lastName && errors.lastName && (
            <Text style={styles.errorTxt}>{errors.lastName}</Text>
          )}

          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputStyle} 
              placeholder="Email Address" 
              autoCapitalize={false}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}/>
          </View>

          {touched.email && errors.email && (
            <Text style={styles.errorTxt}>{errors.email}</Text>
          )}

          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputStyle} 
              placeholder="Password" 
              autoCapitalize={false}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}/>
          </View>

          {touched.password && errors.password && (
            <Text style={styles.errorTxt}>{errors.password}</Text>
          )}

          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputStyle} 
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => setFieldTouched('confirmPassword')}/>
          </View>

          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
          )}

          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputStyle} 
              placeholder="phoneNumber"
              keyboardType='phone-pad'
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={() => setFieldTouched('phoneNumber')}/>
          </View>

          {touched.phoneNumber && errors.phoneNumber && (
            <Text style={styles.errorTxt}>{errors.phoneNumber}</Text>
          )}

          <TouchableOpacity 
            onPress={handleSubmit} 
            disabled={!isValid}
            style={[styles.submitBtn,
              {backgroundColor: isValid ? '#395B64' : '#A5C9CA'}
          ]}>

            <Text styles={styles.submitBtnTxt}>Submit</Text>

          </TouchableOpacity>

        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3333',
    paddingHorizontal: 15,
  },

  formContainer: {
    backgroundColor: '#F5EDDC',
    padding: 20, 
    borderRadius: 20,
    width: '100%'
  },

  title: {
    color: '#16213E',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },

  inputWrapper: {
    marginBottom: 15
  },

  inputStyle: {
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },

  errorTxt: {
    fontSize: 12,
    color: '#FF0D10'
  },

  submitBtn: {
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center'
  },

  submitBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700
  }
});

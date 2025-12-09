import { supabase } from './supabase'

const DU_EMAIL_DOMAINS = [
  'du.ac.in',
  'sac.du.ac.in',
  'st-stephens.du.ac.in',
  'delhi-university.ac.in',
  'nsit.ac.in',
  'aurobindo.du.ac.in',
  'ramjas.du.ac.in',
  'hansraj.du.ac.in',
  'miranda.du.ac.in',
  'lsr.du.ac.in',
  'hindu.du.ac.in',
  'stephens.du.ac.in',
  'venky.du.ac.in',
  'zakir.du.ac.in',
  'daulat.du.ac.in',
  'kb.du.ac.in',
  'kmc.du.ac.in',
  'sgtb.du.ac.in',
];

export function validateDUEmail(email: string) {
  return DU_EMAIL_DOMAINS.some(domain => email.endsWith(domain));
}

export async function signupWithDUEmail(
  email: string,
  password: string,
  fullName: string
) {
  if (!validateDUEmail(email)) {
    throw new Error('Please use a valid DU email address')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { 
        full_name: fullName 
      },
      emailRedirectTo: undefined
    }
  })

  if (error) throw error
  
  if (data.user && !data.session) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (signInError) throw signInError
  }
  
  return data
}

export async function loginWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hprjemmhsvkmzigphcnw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwcmplbW1oc3ZrbXppZ3BoY253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNDE2NzIsImV4cCI6MjA4MDYxNzY3Mn0.hd29ddjyxGNfuWLmZ4Bu-LpuFF9bwsRjbcK-tH6GeKY'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testSignup() {
    const email = `test_agent_${Date.now()}@linguasec.com`
    const password = 'SecurePassword123!'

    console.log(`Intentando registrar usuario: ${email}...`)

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error('❌ Error en registro:', error.message)
    } else {
        console.log('✅ Registro existoso!')
        console.log('User ID:', data.user ? data.user.id : 'No user object (check email confirmation settings)')
        console.log('Session:', data.session ? 'Active' : 'Pending Confirmation')
    }
}

testSignup()

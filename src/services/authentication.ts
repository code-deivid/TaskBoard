import { auth } from '@/firebase/config'
import { ref } from 'vue'

import type { IAuthResponse } from '@/models/authResponse'

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    type User,
} from 'firebase/auth'

export const usuarioActual = ref<User | null>(null)
export const authCargado = ref<boolean>(false)

onAuthStateChanged(auth, (user) => {
    usuarioActual.value = user
    authCargado.value = true
})


export const registrar = async (email: string, password: string): Promise<IAuthResponse> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user


        await sendEmailVerification(user, {
            url: window.location.origin + '/',
        })

        return {
            ok: true,
            mensaje: 'Usuario creado. Revisa tu correo para verificar la cuenta.',
            usuario: user,
        }
    } catch (e) {
        console.error('❌ Error al registrar usuario:', e)
        return {
            ok: false,
            mensaje: 'Error al crear el usuario',
            usuario: null,
        }
    }
}

export const login = async (email: string, password: string): Promise<IAuthResponse> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        if (!user.emailVerified) {

            await signOut(auth)
            return {
                ok: false,
                mensaje: 'Debes verificar tu email antes de iniciar sesión. Revisa tu bandeja.',
                usuario: null,
            }
        }

        return {
            ok: true,
            mensaje: 'Sesión iniciada correctamente',
            usuario: user,
        }
    } catch (e) {
        console.error('❌ Error al iniciar sesión:', e)
        return {
            ok: false,
            mensaje: 'Email o contraseña incorrectos',
            usuario: null,
        }
    }
}

// Logout
export const logout = async () => {
    try {
        await signOut(auth)
        return { ok: true }
    } catch (e) {
        console.error('❌ Error al cerrar sesión:', e)
        return { ok: false }
    }
}
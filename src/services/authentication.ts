import { auth } from '@/firebase/config'
import type { IAuthResponse } from '@/models/authResponse'
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut

} from 'firebase/auth'
import Swal from 'sweetalert2'


import { asegurarDocUsuario } from './db'

export const registrar = async (email: string, password: string): Promise<IAuthResponse> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user


        await asegurarDocUsuario(user)
        await sendEmailVerification(user, {
            url: window.location.origin + '/dashboard',
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

            await Swal.fire({
                icon: 'warning',
                title: 'Error de sesión',
                text: 'Debes verificar tu email antes de iniciar sesión. Revisa tu bandeja.',
            })
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

export const logout = async () => {
    try {
        await signOut(auth)
        return { ok: true }
    } catch (e) {
        console.error('❌ Error al cerrar sesión:', e)
        return { ok: false }
    }
}
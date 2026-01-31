import { db } from '@/firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import type { User } from 'firebase/auth'



export const asegurarDocUsuario = async (user: User) => {
    await setDoc(
        doc(db, 'usuarios', user.uid),
        {
            email: user.email,

        },
        { merge: true }
    )
}









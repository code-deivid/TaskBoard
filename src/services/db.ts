import { db } from '@/firebase/config'
import { doc, getDoc, setDoc, arrayUnion } from 'firebase/firestore'

export interface IRMCharacter {
    id: number
    name: string
    image: string
    status: string
    gender: string
}

export interface IFavoritesDoc {
    personajes: IRMCharacter[]
}
export interface IResult {
    ok: boolean,
    mensaje: string | null
    personajes: IRMCharacter[] | []
}

export const agregarFavorito = async (uid: string, personaje: IRMCharacter): Promise<IResult> => {
    try {
        const ref = doc(db, 'favorites', uid)

        await setDoc(
            ref, { personajes: arrayUnion(personaje) },
            { merge: true },
        )

        return {
            ok: true,
            personajes: [],
            mensaje: 'Personaje añadido a favoritos'
        }
    } catch (e) {
        console.error('❌ Error al añadir favorito:', e)
        return {
            ok: false,
            personajes: [],
            mensaje: 'No se pudo añadir a favoritos'
        }
    }
}

export const obtenerFavoritos = async (uid: string): Promise<IResult> => {
    try {
        const ref = doc(db, 'favorites', uid)
        const snap = await getDoc(ref)

        if (!snap.exists()) {
            return {
                ok: true,
                personajes: [] as IRMCharacter[],
                mensaje: 'No existen los personajes'

            }
        }

        const data = snap.data() as IFavoritesDoc
        return {
            ok: true,
            personajes: data.personajes ?? [],
            mensaje: "Se ha añadido correctamente"
        }
    } catch (e) {
        console.error('❌ Error al obtener favoritos:', e)
        return {
            ok: false,
            personajes: [] as IRMCharacter[],
            mensaje: "No se ha añadido correctamente"
        }
    }
}


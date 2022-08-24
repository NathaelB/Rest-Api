import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { StoreValidator, UpdateValidator } from 'App/Validators/UserValidator'

export default class UsersController {
    public async index ({ response }: HttpContextContract) {
        const users = await User.query().orderBy('username', 'desc')
        return response.send({
            number: users.length,
            users: users
        })
    }

    public async show ({ params, response }: HttpContextContract) {
        const user = await User.query().where('username', params.id).first()
        return response.send({ user: user })
    }

    public async store ({ request, response }: HttpContextContract) {
        const data = await request.validate(StoreValidator)
        const user = await User.create(data)

        return response.send({
            message: "Utilisateur créé",
            user: user
        })
    }

    public async update ({ params, request, response }: HttpContextContract) {
        const user = await User.query().where('username', params.id).first()
        if (!user) return response.send({message: "Utilisateur non existant"})

        const data = await request.validate(UpdateValidator)
        if (Object.keys(data).length === 0) {
            return response.send({
                message: `L'utilisateur ${user.id} n'a pas été modifié`,
                user: user
            }) 
        }

        await user.merge(data).save()
        console.log(user);
        
        return response.send({
            message: `L'utilisateur ${user.id} viens d'être modifié`,
            user: user
        })
    }

    public async destroy ({ params, response }: HttpContextContract) {
        const user = await User.query().where('username', params.id).first()

        if (!user) {
            return response.send({
                message: `L'utilisateur ${params.id} est inexistant`
            })
        }

        await user.delete()
        return response.send({
            message: `L'utilisateur ${params.id} viens d'être anéhanti ^^`,
            user: user
        })
    }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categorie from 'App/Models/Categorie'
import { StoreValidator, UpdateValidator } from 'App/Validators/CategoryValidator'

export default class CategoriesController {
    public async index ({ bouncer, response }: HttpContextContract) {
        await bouncer.with('CategoriePolicy').authorize('viewList')

        const categories = await Categorie.query().orderBy('label', 'desc')

        return response.send({
            nombre: categories.length,
            categories: categories
        })
    }

    public async show ({ bouncer, params, response }: HttpContextContract) {
        await bouncer.with('CategoriePolicy').authorize('view')

        const categorie = await Categorie.query().where('slug', params.id).first()

        return response.send({ categorie: categorie })
    }

    public async store ({ bouncer, request, response }: HttpContextContract) {
        await bouncer.with('CategoriePolicy').authorize('create')

        const data = await request.validate(StoreValidator)

        const categorie = await Categorie.create(data)
        return response.send({
            message: 'Catégorie créé', 
            categorie: categorie
        })
    }

    public async update ({ bouncer, request, response, params }: HttpContextContract) {
        await bouncer.with('CategoriePolicy').authorize('update')

        const categorie = await Categorie.query().where(params.id).first()
        if(!categorie) return response.send({ mesage: 'Catégorie inexistante' })

        const data = await request.validate(UpdateValidator)
        const categorieModifie = await categorie.merge(data).save()

        return response.send({
            message: 'Catégorie modifiée',
            categorie: categorieModifie
        })
    }

    public async destroy ({ bouncer, params, response }) {
        await bouncer.with('CategoriePolicy').authorize('delete')

        const categorie = await Categorie.query().where(params.id).first()
        if(!categorie) return response.send({ mesage: 'Catégorie inexistante' })

        await categorie.delete()

        return response.send({ message: 'Catégorie détruite' })
    }
}

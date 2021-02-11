import ProductDate from '../product-date/ProductDate'
import Product from '../product/Product'
import Tag from '../tag/Tag'
import * as _ from 'lodash'

export const seedProducts = async () => {
    var count = await Product.count()
    if (count > 0) return

    await createProduct(
        'Crunchy stir fry featuring fresh thyme and free range chicken',
        'Thyme and chicken stir fry',
        'https://images.unsplash.com/photo-1567575990843-105a1c70d76e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80',
        false,
        4
    )

    await createProduct(
        'Apricot ice cream with butter',
        'Creamy, apricot ice cream served with a rich butter sauce"',
        'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80',
        true,
        12
    )

    await createProduct(
        'Plantain and bean madras',
        'Medium-hot madras made with fresh plantain and bean"',
        'https://images.unsplash.com/photo-1547714695-bed5d1fef848?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80',
        true,
        17
    )

    await createProduct(
        'Chicken and turkey panini',
        'A hot, pressed panini filled with free range chicken and smoked turkey',
        'https://images.unsplash.com/photo-1568158879083-c42860933ed7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=933&q=80',
        false,
        7
    )

    await createProduct(
        'Poussin and feta salad',
        'Poussin and tangy feta served on a bed of lettuce',
        'https://images.unsplash.com/photo-1526401363794-c96708fb8089?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        true,
        22
    )
}

export const seedProductTags = async () => {
    var count = await Tag.count()
    if (count > 0) return

    await Tag.create({ name: 'Vegan' })
    await Tag.create({ name: 'Bio' })
    await Tag.create({ name: 'Meat' })
    await Tag.create({ name: 'Gluten free' })
    await Tag.create({ name: 'Dessert' })
    await Tag.create({ name: 'Healthy' })
}

export const seedProductDates = async () => {
    var count = await ProductDate.count()
    if (count > 0) return

    const allProducts = await Product.findAll()

    var beginDate = new Date()
    var endDate = new Date()
    endDate.setDate(endDate.getDate() + 6)
    var dates = getDaysArray(beginDate, endDate)

    dates.forEach(async date => {
        let randomProducts = shuffleData(allProducts)
        var productDate = await ProductDate.create({ value: date })
        await productDate.$set('products', randomProducts)
    })
}

const createProduct = async (
    title: string,
    description: string,
    imageUrl: string,
    isTrending: boolean,
    price: number
) => {
    var product = await Product.create({
        title,
        description,
        imageUrl,
        isTrending,
        price,
    })

    var tags = await Tag.findAll()
    const shuffled = shuffleData(tags)
    product.$set('tags', shuffled)
}

const shuffleData = <T>(payload: T[]) => {
    if (payload.length <= 0) return []
    const shuffled = payload.sort(() => 0.5 - Math.random())
    return _.sampleSize(
        shuffled,
        Math.floor(Math.random() * (shuffled.length - 2 + 1)) + 3
    )
}

var getDaysArray = (start: Date, end: Date) => {
    for (
        var dates = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
    ) {
        dates.push(new Date(dt))
    }

    return dates
}

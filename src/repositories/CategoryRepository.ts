import { EntityRepository, getRepository, Repository } from 'typeorm';

import Category from '../models/Category';

interface CategoryId {
  id: string;
}

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async getCategoryId(category: string): Promise<CategoryId> {
    const categoryRepository = getRepository(Category);

    const findId = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!findId) {
      const categoryRegister = await categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(categoryRegister);

      return {
        id: categoryRegister.id,
      };
    }

    const categoryRegister = findId.id;

    return {
      id: categoryRegister,
    };
  }
}

export default CategoryRepository;

import { Test, TestingModule } from '@nestjs/testing';
import { FindAllGoldenRaspberryAwardsUseCase } from './find-all-golden-raspberry-awards';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';

describe('FindAllGoldenRaspberryAwardsUseCase', () => {
  describe('execute', () => {
    let useCase: FindAllGoldenRaspberryAwardsUseCase;
    let repository: Repository<GoldenRaspberryAward>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FindAllGoldenRaspberryAwardsUseCase,
          {
            provide: getRepositoryToken(GoldenRaspberryAward),
            useClass: Repository,
          },
        ],
      }).compile();

      useCase = module.get<FindAllGoldenRaspberryAwardsUseCase>(
        FindAllGoldenRaspberryAwardsUseCase,
      );
      repository = module.get<Repository<GoldenRaspberryAward>>(
        getRepositoryToken(GoldenRaspberryAward),
      );
    });

    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });

    it('should find all awards', async () => {
      const finalAllResult = [
        {
          id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
          year: '2022',
          title: 'Title Teste',
          studios: 'Studios Teste',
          producers: 'ProducersTeste',
          winner: true,
        },
        {
          id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
          year: '2025',
          title: 'Title teste',
          studios: 'Studios teste',
          producers: 'Producers teste',
          winner: false,
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(finalAllResult);
      const findAllResult = await useCase.execute();
      expect(repository.find).toHaveBeenCalled();
      expect(findAllResult).toHaveLength(2);
      expect(findAllResult).toEqual(finalAllResult);
    });
  });
});

<?php

namespace App\DataFixtures;

use App\Entity\VacationRequest;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $vacationRequest = new VacationRequest();
        $vacationRequest->setEmployee('Igor');
        $vacationRequest->setStartDate(new DateTime('2025-11-17'));
        $vacationRequest->setEndDate(new DateTime('2025-11-20'));
        $vacationRequest->setDaysCount(4);
        $vacationRequest->setType('paid');
        $vacationRequest->setStatus('not granted');
        $vacationRequest->setCreatedAt(new DateTime());

        $manager->persist($vacationRequest);
        $manager->flush();

        $vacationRequest1 = new VacationRequest();
        $vacationRequest1->setEmployee('Mateusz');
        $vacationRequest1->setStartDate(new DateTime('2025-11-17'));
        $vacationRequest1->setEndDate(new DateTime('2025-11-17'));
        $vacationRequest1->setDaysCount(1);
        $vacationRequest1->setType('not paid');
        $vacationRequest1->setStatus('granted');
        $vacationRequest1->setCreatedAt(new DateTime());

        $manager->persist($vacationRequest1);
        $manager->flush();
    }
}

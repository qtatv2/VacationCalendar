<?php

namespace App\Controller;

use DateTime;
use App\Entity\User;
use App\Entity\VacationRequest;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\VacationRequestRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

final class VacationRequestController extends AbstractController
{
    #[Route('/api/requests', name: 'app_vacation_request', methods: ['GET'])]
    public function showRequests(VacationRequestRepository $repository): JsonResponse
    {
         $requests = $repository->findAll();
        return $this->json($requests);
    }

    #[Route('/api/requests', name: 'app_vacation_request', methods: ['POST'])]
    public function createRequests(Request $request, EntityManagerInterface $em): Response
    {
        try{
            $data = $request->toArray();
        }catch (\Exception $e) {
            return $this->json(['error' => 'Nieprawidłowy format JSON'], 400);
        }
        /** @var User $user */
        $user = $this->getUser();

        $vacationRequest = new VacationRequest;
        $vacationRequest->setEmployee($user);
        $vacationRequest->setStartDate(new DateTime($data['startDate']));
        $vacationRequest->setEndDate(new DateTime($data['endDate']));
        $vacationRequest->setDaysCount($data['daysCount']);
        $vacationRequest->setType($data['type']);
  

        $em->persist($vacationRequest);
        $em->flush();

        return $this->json(['message' => 'Wniosek wysłany'], 201);
    }
}

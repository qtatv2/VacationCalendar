<?php

namespace App\Controller;

use App\Repository\VacationRequestRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    #[Route('/api/home', name: 'home', methods: ['GET'])]
    public function index(VacationRequestRepository $repository): Response
    {
        $requests = $repository->findAll();
        dd($requests);
        return $this->json($requests);
    }
}

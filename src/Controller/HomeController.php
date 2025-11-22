<?php

namespace App\Controller;

use App\Repository\VacationRequestRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'home')]
    public function index(VacationRequestRepository $repository): Response
    {
        $requests = $repository->findAll();
        dd($requests);
        return new Response('<div style="background: #3cb331ff; width: 200px; color: white;">Hi!</div>');
    }
}

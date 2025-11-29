<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ApiController extends AbstractController
{
    #[Route('/api/hello', name: 'api_hello', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Pozdrowienia z Symfony! 🐘',
            'date' => date('d-m-Y H:i:s'),
            'items' => ['React', 'TypeScript', 'Docker', 'Tailwind']
        ]);
    }
}
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class MeController extends AbstractController
{
    #[Route('/api/me', name: 'app_me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        /** @var User */
        $user = $this->getUser();

        return $this->json([
            'email'     => $user->getEmail(),
            'firstName' => $user->getFirstName(), 
            'lastName'  => $user->getLastName(),
            'roles'     => $user->getRoles(),
        ]);
    }
}

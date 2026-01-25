<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

final class MeController extends AbstractController
{
    #[Route('/api/me', name: 'app_me')]
    public function me(): JsonResponse
    {
        /** @var User */
        $user = $this->getUser();

        if (!$user) 
        {
        return $this->json([
            'error' => 'Nie jesteś zalogowany'
            ], 401);
        }

        return $this->json([
            'email'     => $user->getEmail(),
            'firstName' => $user->getFirstName(), 
            'lastName'  => $user->getLastName(),
            'roles'     => $user->getRoles(),
        ]);
    }
}

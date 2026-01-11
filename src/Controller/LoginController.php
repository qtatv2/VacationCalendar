<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

final class LoginController extends AbstractController
{
    #[Route('/api/login_check', name: 'app_login')]
    public function login(): JsonResponse
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
            'name' => $user->getFirstName() . ' ' . $user->getLastName()
        ]);
    }
}

<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Constraints\Json;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(EntityManagerInterface $em, Request $request, UserPasswordHasherInterface $hasher): JsonResponse
    {
        try{
            $data = $request->toArray();
        }catch (\Exception $e) {
            return $this->json(['error' => 'Nieprawidłowy format JSON'], 400);
        }

        $user = new User;
        $user->setEmail($data['email']);
        $hashedPassword = $hasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setRoles([$data['role']]);
        $em->persist($user);
        $em->flush();

        return $this->json([
            'message' => 'Rejestracja udana!',
            'userId' => $user->getId()
        ], 201);
    }
}

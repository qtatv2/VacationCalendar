<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Constraints\Json;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(EntityManagerInterface $em, Request $request, UserPasswordHasherInterface $hasher, ValidatorInterface $validator): JsonResponse
    {
        try{
            $data = $request->toArray();
        }catch (\Exception $e) {
            return $this->json(['error' => 'Nieprawidłowy format JSON'], 400);
        }
        
        $user = new User;
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setRoles([$data['role']]);

        $errors = $validator->validate($user);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getMessage();
                }
                return $this->json(['error' => $errorMessages], 400);
            }
        $user->setPassword($hasher->hashPassword($user, $data['password']));
        $em->persist($user);
        $em->flush();

        return $this->json([
            'message' => 'Rejestracja udana!',
            'userId' => $user->getId()
        ], 201);
    }
}

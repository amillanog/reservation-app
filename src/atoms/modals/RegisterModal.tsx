"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Modal from "@atoms/modals/Modal";
import Heading from "@atoms/heading/Heading";
import Input from "@atoms/inputs/Input";
import Button from "@atoms/buttons/Button";
import useRegisterModal from "@custom-hooks/useRegisterModal";
import useLoginModal from "@custom-hooks/useLoginModal";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
	const router = useRouter();

	// init form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true);
		axios
			.post("/api/register", data)
			.then(() => {
				toast.success("Registrado!");
				registerModal.onClose();
			})
			.catch(error => {
				toast.error("Ha ocurrido un error.");
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleGoogleSignIn = async () => {
		setIsLoadingGoogle(true);
		signIn("google", {
			callbackUrl: "/",
		}).then(callback => {
			if (callback?.ok) {
				toast.success("Usuario logueado");
				setIsLoadingGoogle(false);
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				setIsLoadingGoogle(false);
				toast.error(callback.error);
			}
		});
	};

	const onToggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Te damos la bienvenida a Airbnb" subtitle="Crea una cuenta!" />
			<Input id="email" label="Correo" disabled={isLoading} register={register} errors={errors} required />
			<Input id="name" label="Nombre" disabled={isLoading} register={register} errors={errors} required />
			<Input
				id="password"
				type="password"
				label="Contraseña"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				loading={isLoadingGoogle}
				outline
				label="Continúa con Google"
				icon={FcGoogle}
				onClick={() => handleGoogleSignIn()}
			/>
			{/* <Button  outline label="Continúa con Google" icon={FcGoogle} onClick={() => signIn("google")} /> */}
			<div
				className="
					text-neutral-500
					text-center
					mt-4
					font-light
				"
			>
				<div
					className="
						justify-center flex flex-row items-center gap-2
					"
				>
					<div>Ya tienes una cuenta?</div>
					<div
						onClick={onToggle}
						className="
							text-neutral-500
							cursor-pointer
							hover:underline
						"
					>
						{" "}
						Logueate
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Iniciar sesión o registrarse"
			actionLabel="Continúa"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;

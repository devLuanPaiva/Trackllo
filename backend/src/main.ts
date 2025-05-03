import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { NestExpressApplication } from "@nestjs/platform-express"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.enableCors({
		origin: ["http://localhost:4200", "https://trackllo.vercel.app"],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
		allowedHeaders: "Content-Type, Authorization, X-Requested-With",
	})

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	)

	await app.listen(process.env.PORT ?? 3000)

	console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()

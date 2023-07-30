#include <SDL.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#undef main

enum Direction {
	up = -1, none = 0, down = 1
};
struct player
{
	SDL_Rect rect;
	enum Direction direction;
};
struct Ball
{
	SDL_Rect rect;
	float xvel;
	float yvel;
};

bool init_sdl();
void handle_input();
void throw_error();
void close_game();
void update_screen();
void move_paddles();
void init_game();
int update_ball();
void debug_statement(int value);

SDL_Window* window = NULL;
SDL_Renderer* renderer = NULL;
SDL_Event e;

const int SCREEN_WIDTH = 850;
const int SCREEN_HEIGHT = 500;
const int GAME_SPEED = 500;
const int TILE_SIZE = 10;

struct player player[2];
struct Ball ball;
bool quit;
bool game_start;
int deltatime_ms;


int main()
{
	init_game();

	if (init_sdl())
	{
		throw_error();
		return 0;
	}

	//initialising delta time
	int start = 0;
	int end = SDL_GetTicks();
	deltatime_ms = 0;

	quit = false;
	while (!quit)
	{
		handle_input();
		move_paddles();

		update_ball(); //return value checking still to be done

		update_screen();

		//updating delta time
		start = end;
		end = SDL_GetTicks();
		deltatime_ms = end - start;
		if (deltatime_ms < 20)
			SDL_Delay(20 - deltatime_ms );
	}
	close_game();
	return 0;
}


//(incomplete) moves ball for a particular frame, returns true if collision, false otherwise
int update_ball()
{
	if (!game_start)
		return 0;
	
	int deltax = ball.xvel * GAME_SPEED * deltatime_ms / 1000;
	int deltay = ball.yvel * GAME_SPEED * deltatime_ms / 1000;
	int nextx = ball.rect.x + deltax;
	int nexty = ball.rect.y + deltay;

	if (nexty < 0 || nexty + ball.rect.h > SCREEN_HEIGHT)
	{
		ball.yvel *= -1;
		deltay *= -1;
	}

	ball.rect.x += deltax;
	ball.rect.y += deltay;
		
	
	return 0;
}

//(need to add random) Initialises both paddle rects, ball rect and ball velocities
void init_game()
{
	srand(time(0));
	ball.xvel = 0.5;
	ball.yvel = 0.5;

	game_start = false;
	ball.rect.w = TILE_SIZE * 1.5;
	ball.rect.h = TILE_SIZE * 1.5;
	ball.rect.x = SCREEN_WIDTH / 2 - ball.rect.w / 2;
	ball.rect.y = SCREEN_HEIGHT / 2 - ball.rect.h / 2;

	for (int i = 0; i < 2; i++)
	{
		player[i].rect.w = TILE_SIZE / 2;
		player[i].rect.h = TILE_SIZE * 8;
		player[i].rect.x = i * (SCREEN_WIDTH - player[i].rect.w) - 10 * (i * 2 - 1);
		player[i].rect.y = SCREEN_HEIGHT / 2 - player[i].rect.h / 2;
		player[i].direction = none;
		printf("Player %d:\n	x:%d\n	y:%d\n	w:%d\n	h:%d\n", i + 1, player[i].rect.x, player[i].rect.y, player[i].rect.h, player[i].rect.w);
	}
}

//Displays both items and ball
void update_screen()
{
	SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
	SDL_RenderClear(renderer);

	SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
	SDL_RenderFillRect(renderer, &player[0].rect);
	SDL_RenderFillRect(renderer, &player[1].rect);
	SDL_RenderFillRect(renderer, &ball.rect);

	SDL_RenderPresent(renderer);
}

//Initialises all required sdl display items
bool init_sdl()
{
	if (SDL_Init(SDL_INIT_VIDEO) < 0)
	{
		printf("SDL could not initialize! SDL_Error: %s\n", SDL_GetError());
		return true;
	}

	window = SDL_CreateWindow("Snake", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
	if (window == NULL)
	{
		printf("Window could not be created! SDL_Error: %s\n", SDL_GetError());
		return true;
	}

	renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);
	if (renderer == NULL)
	{
		printf("Renderer could not be created! SDL_Error: %s\n", SDL_GetError());
		return true;
	}
	printf("Initialisation Succesful.\n");
	return false;
}

//Handles all input, including game objects and quitting
void handle_input()
{
	while (SDL_PollEvent(&e) != 0)
	{
		if (e.type == SDL_QUIT)
			quit = true;
	}
	const Uint8* keystate = SDL_GetKeyboardState(NULL);

	if (keystate[SDL_SCANCODE_UP])
		player[1].direction = up;
	if (keystate[SDL_SCANCODE_DOWN])
		player[1].direction = down;
	if (keystate[SDL_SCANCODE_W])
		player[0].direction = up;
	if (keystate[SDL_SCANCODE_S])
		player[0].direction = down;
	if (keystate[SDL_SCANCODE_ESCAPE])
		quit = true;
	if (keystate[SDL_SCANCODE_SPACE])
		game_start = true;
}

//Called whenever there is an error in the code
void throw_error()
{
	printf("Error: %s\n", SDL_GetError());
	SDL_DestroyRenderer(renderer);
	SDL_DestroyWindow(window);
	SDL_Quit();
}

//Quits game
void close_game()
{
	SDL_DestroyRenderer(renderer);
	SDL_DestroyWindow(window);
	SDL_Quit();
}

//Moves the paddles depending on direction of travel
void move_paddles()
{
	int new_y_pos;
	for (int i = 0; i < 2; i++)
	{
		new_y_pos = player[i].rect.y + player[i].direction * GAME_SPEED * deltatime_ms / 1000;

		if (new_y_pos >= 0 && new_y_pos + player[i].rect.h <= SCREEN_HEIGHT)
			player[i].rect.y = new_y_pos;

		player[i].direction = none;
	}

}

//(temporary) prints debug statement
void debug_statement(int value)
{
	printf("The value given is %d\n", value);
}

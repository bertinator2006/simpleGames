import pygame


TILE_SIZE = 100
WIDTH  = TILE_SIZE * 3 + 2
HEIGHT = TILE_SIZE * 3 + 2

pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tic Tac Toe")
clock = pygame.time.Clock()
THICKNESS = 5
BLACK = (0,0,0)
WHITE = (255,255,255)
RED = (255,0,0)
BLUE = (0,0,255)
screen.fill(WHITE)
pygame.draw.line(screen, BLACK, (TILE_SIZE, 0), (TILE_SIZE, HEIGHT),3 )
pygame.draw.line(screen, BLACK, (TILE_SIZE*2 + 1, 0), (TILE_SIZE* 2 + 1, HEIGHT),3 )
pygame.draw.line(screen, BLACK, (0, TILE_SIZE), (WIDTH, TILE_SIZE),3 )
pygame.draw.line(screen, BLACK, (0, TILE_SIZE*2 + 1), (WIDTH,TILE_SIZE*2 + 1),3 )
pygame.display.flip()

board = [ 
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
player_turn = 1

def check_input(position):
    global player_turn
    x = position[0]
    y = position[1]
    idx =  int(x / TILE_SIZE)
    idy = int(y / TILE_SIZE)
    if board[idy][idx] != 0:
        return 0
    board[idy][idx] = player_turn
    player_turn = 3 - player_turn
    return 3-player_turn

def render_circle(x, y):
    mid_cell = (x*TILE_SIZE + TILE_SIZE/2, y*TILE_SIZE + TILE_SIZE/2)
    pygame.draw.circle(screen, RED, mid_cell, TILE_SIZE / 4, width = THICKNESS)

def render_cross(x, y):
    x1y1 = (x*TILE_SIZE + TILE_SIZE/4, y*TILE_SIZE + TILE_SIZE/4)
    x2y2 = (x*TILE_SIZE + TILE_SIZE*3/4, y*TILE_SIZE + TILE_SIZE*3/4)
    pygame.draw.line(screen, BLUE, x1y1, x2y2, THICKNESS)
    x1y1 = (x*TILE_SIZE + TILE_SIZE*3/4, y*TILE_SIZE + TILE_SIZE/4)
    x2y2 = (x*TILE_SIZE + TILE_SIZE/4, y*TILE_SIZE + TILE_SIZE*3/4)
    pygame.draw.line(screen, BLUE, x1y1, x2y2, THICKNESS)

def render_board():
    for idy, y in enumerate(board):
        for idx, x in enumerate(y):
            if x == 2:
                render_circle(idx,idy)
            elif x == 1:
                render_cross(idx,idy)
    pygame.display.flip()

def game_won():
    pass

def check_win():
    #checking verticals
    for i in range(2):
        for x in range(3):
            count = 0
            for y in range(3):
                if board[y][x] == i+1:
                    count += 1
            if count == 3:
                return i+1
        
    #checking horizontals
    for i in range(2):
        for x in range(3):
            count = 0
            for y in range(3):
                if board[x][y] == i+1:
                    count += 1
            if count == 3:
                return i+1

    #checking diagonals
    for i in range(2):
        for i in range(3):
            #continue here
            pass
    pass

render_board()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            mouse_pos = pygame.mouse.get_pos()
            move = check_input(mouse_pos)
            if move!= 0:
                render_board()
                if check_win():
                    game_won()
    pass


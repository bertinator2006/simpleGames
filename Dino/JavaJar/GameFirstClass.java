package gamefirstclass;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import javax.swing.JFrame;

public class GameFirstClass extends JFrame {
//Variables

    int y, x;
//Double Buffer
    private Image dbImage;
    private Graphics dbg;

//Window Basics
    public GameFirstClass() {
        addKeyListener(new AL());
        setTitle("Add window title");
        setSize(800, 700);
        setResizable(false);
        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        x = 150;
        y = 150;

    }
// main

    public static void main(String[] args) {
        new GameFirstClass();
    }
    //Controls
    public class AL extends KeyAdapter {

        @Override
        public void keyPressed(KeyEvent event) {
            int keyCode = event.getKeyCode();
            if (keyCode == event.VK_LEFT)
            {
                x--;
            }
            if (keyCode == event.VK_RIGHT)
            {
                x++;
            }
            if (keyCode == event.VK_UP)
            {
                y--;
            }
            if (keyCode == event.VK_DOWN)
            {
                y++;
            }
        }

        @Override
        public void keyReleased(KeyEvent event) {
        }
    }
//Double Buffer

    @Override
    public void paint(Graphics g) {
        dbImage = createImage(getWidth(), getHeight());
        dbg = dbImage.getGraphics();
        paintComponent(dbg);
        g.drawImage(dbImage, 0, 0, this);
    }

    public void paintComponent(Graphics g) {
        g.fillOval(x, y, 15, 15);
        repaint();
    }
}

import java.awt.Canvas;
import java.awt.Graphics;
import javax.swing.JFrame;

import java.awt.Color;
import java.awt.Dimension;
import javax.swing.JButton;
import javax.swing.JFrame;

public class Dino {
   public static void main(String[] args) {
      JFrame frame = new JFrame();
      JButton button = new JButton("Click to Close!");
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.setContentPane(button);
      button.addActionListener(e -> {
         frame.dispose();
      });
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.setPreferredSize(new Dimension(550, 300));
      frame.getContentPane().setBackground(Color.ORANGE);
      frame.pack();
      frame.setVisible(true);
   }
}
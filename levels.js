//Map legend:
//
// =:Grass 1:Grass_l 2:Grass_r L:Grass_l_top R:Grass_r_top #:Box g:Ghostblock £:Halfblock
//
// @:Monster D:Door i:Ice s:Slime K:Key(green) E:Key(red) Y:Key(blue) ^:Spikes t:Trampoline

// J:doublejump U:teleswap 0:Ghost 8:Grow o:Shrink B:Barrier

/*[
  "#z       z       z       z       z       z       z       z",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#                                                         ",
  "#|||||||||||||||||||||||||||||||||||||||||||||||||||||||||",
],*/


export const levels = () => {
  return [
    //0
    [
      "#z       z       z       z       z       z       z       z       z       z       z       z       z       z       z       z       z       z       z       z     #",
      "#                                                        <                                                                                                     #",
      "#                              >                                                                   >                                                           #",
      "#                                           >                            <                                                                                     #",
      "#        <                                                                             x                                x                                      #",
      "#                                                            x                                                                                                 #",
      "#                  >                                                                                      <                                                    #",
      "#                            x                <                 x            >                                                                 x               #",
      "#                                                                                                                                                              #",
      "#              x                                                                                                                                               #",
      "#                                                                                                      x                                 6777/                 #",
      "#                                            x                                                                                                       b         #",
      "#                                                                                                                                             6777777/         #",
      "#                                                            -                                                         b                  b                    #",
      "#                                                         =======                  =                                   =               t  677                  #",
      "#                                   K     E             gg              B^^^^^^2===+                -              U  d                +  555777               #",
      "#           !                     2==1   2==1          gg              2=======+555+        3     2===1           2=====               +     555777            #",
      "# P P  +    ! -          J J      +3++ Y ++++         gg               +55555555   +        +     ++3++=          +55555               +        555777         #",
      "#======+====4=====1   2=======1   ++:++:+++++       0gg               o$    d           8?  :  ?  +++:++=                     b -   t  +  444      555777   D  #",
      "#+3+++¤++++++:3++++   +++++:+++   +++++++¤+++   =======    ==    ==================  ====+==+  ?  +¤+++++===========wwwwwwwwww!========+==============:++======#",
      "#+++++++:+++3++++++   ++¤++++++   +++3+++++++   +3++:++          ++¤++++:3++++++++3  +:++:+++  ?  +++:+++3+++¤++++:++++++3++++!++:+++++++:++¤++++++++++++3+++++#",
      "#||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||?|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||#",
    ],
    //1
    [
      "#z       z       z       z       z       z       z       z",
      "#                                                         ",
      "#                                                         ",
      "#                                                         ",
      "#                                                         ",
      "#                                                         ",
      "#                                                         ",
      "#                                                         ",
      "#                                                         ",
      "# D                        ============                   ",
      "#===1                      g0        Kg                   ",
      "#3555       =              gggggggggggg   t               ",
      "#+  J  8  U :                             :               ",
      "#:E         $o                            +   t          2",
      "#+===========1             t              +   +          +",
      "#5555555555555        t    =              +^^^3  21    - ¤",
      "#                t    =    :  =           +++++  $$ 2====+",
      "#   P     P     2=    +    +  +           55555  ===+5555+",
      "#===============++^^^^+^^^^+^^+                  !!!4  Y +",
      "#:++++3++++++¤+++++++++++++++3+==================444=====+",
      "#++¤++++3++++++:+++++++:+++¤++++++++++++:++++++++++++¤++++",
      "#|||||||||||||||||||||||||||||||||||||||||||||||||||||||||",
    ],
    //2
    [
      "#z       z       z       z       z       z       z       z #",
      "#                                                          #",
      "#                                                          #",
      "#                                                          #",
      "#                                                          #",
      "#                                                          #",
      "#                                                          #",
      "#                                                          #",
      "#                                                          #",
      "#                                                          #",
      "#   ?                                                    D #",
      "#- ££                                                 2====#",
      "#+++++  =                         2====               +5555#",
      "#55555  +   t    t    t      B    +   g               +    #",
      "#U  K   $ P +^^^^+^^^^+  U        $0 Eg             - +    #",
      "#===========+====+====+====================1    2=====+4444#",
      "#555555555555555555555555555555555555555555+=   +5555554444#",
      "#                       !                  5+=  +      4444#",
      "# -  P                  ! o ^^^^^^^^^^^     55  bJ    Y4444#",
      "#=============44===44===4===+++++++++++=========!==========#",
      "#+++++++++++++44+++44+++++++++++++++++++++++++++!++++++++++#",
      "#||||||||||||||||||||||||||||||||||||||||||||||||||||||||||#",
    ],
    [
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "^ PP          B       8     o  J  d    D   O   ",
      "===============================================",
    ],
    [
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "                                               ",
      "              ##      O                        ",
      "===============================================",
    ],
    //0 in progress
    [
      "z       z       z       z       z       z       z       ",
      "                                                        ",
      "                                                        ",
      "                                                        ",
      "                                                        ",
      "         <                                              ",
      "                            >     c                     ",
      "                             ==============             ",
      "                                                x       ",
      "                   x   ==             ###               ",
      "                                                        ",
      "                                                U       ",
      "                           ==                 ====      ",
      "                                  B                     ",
      "                                2==1                    ",
      "  t P  b#    D  K E Y -           ++++t  d  o  2=======1^",
      "=============6777/=====     2===++++======1 555555++++==",
      "+++++:++++++++++++++3+++wwww+++++++++++++++4     J++++++",
      "+3++++++++¤++++++++++:++====+++3+++++++++++=======++++++",
      "+                             +                         ",
      "+                             +                         ",
      "||||||||||||||||||||||||||||||||||||||||||||||||||||||||",
    ],
    //6
    [
      "key                                                  ",
      "2                                                    ",
      "2                                                    ",
      "2                                                    ",
      "2                                                    ",
      "2                                                    ",
      "2                                                    ",
      "2                                                    ",
      "2       K                                            ",
      "2      ##                                            ",
      "2     ##                                             ",
      "2                                                    ",
      "2           J                                        ",
      "2         ^^^    U                                   ",
      "2  ^iiiiii#############                              ",
      "2  #                  ##                             ",
      "2  #Y      ¤          #$$                            ",
      "2  #E      ¤ o8   dd  _  %%   PP dJB  ^   O          ",
      "2  ########$#########################################",
      "2                                                    ",
      "2||||||||||||||||||||||||||||||||||||||||||||||||||||",
    ],
    //   //1
    //   [
    //     "         Y       key                              ",
    //     "   D                                              ",
    //     "                                                  ",
    //     "         E      U                                 ",
    //     "gggggggggggggggggg                                ",
    //     "                                     K            ",
    //     "                                   ^^iiii         ",
    //     "                                   ######  #      ",
    //     "           g                       ££££££ ##      ",
    //     "       J  0g      t                #=========     ",
    //     "           g      £     o          #              ",
    //     "#####################^####sssssssss###############",
    //     "##################################################",
    //   ],
    //   //2
    //   [
    //     "                J      key              ",
    //     "                                        ",
    //     "###########################            #",
    //     "# K                                    #",
    //     "####    ##############                 #",
    //     "#                     #                #",
    //     "####ssss############# #                #",
    //     "# o                   #                #",
    //     "# #         #    #    #                #",
    //     "# #iiiiiiiii#iiii#iiii#                #",
    //     "#                     #t               #",
    //     "#                     ##               #",
    //     "######£ ###### £##### ##iiiiiiiiiiiiiii#",
    //     "#   #Y #0     # E#    ##################",
    //     "#   ####   U J####    #                #",
    //     "#   g  ###g###        #                #",
    //     "#   g                 #                #",
    //     "#   g                 #                #",
    //     "#   g           8     #                #",
    //     "#   g    ###          #                #",
    //     "# #####################                #",
    //     "#                     #                #",
    //     "#                     #                #",
    //     "#                  #  #                #",
    //     "#    #   g   #   g #  #   #            #",
    //     "#   g   g   g   g  #  #   #     D      #",
    //     "#                  #      #            #",
    //     "###ssssssssssssssss#      #            #",
    //     "########################################",
    //     "########################################",
    //   ],

    //   //3
    //   [
    //     "                 key                           ",
    //     "        Y                         E            ",
    //     "        #####                   ggg            ",
    //     "            #                 ggg              ",
    //     "            #               ggg                ",
    //     "            #  t           ggg                 ",
    //     "            #######     ggg             D      ",
    //     "        O   g#U    #g                          ",
    //     "^           g     0 gK t   J                   ",
    //     "===============================================",
    //   ],
    //   //4 camera and size tests
    //   [

    //     "1                                                                 2",
    //     "1                                                                 2",
    //     "1                                                                 2",
    //     "1    P                                                            2",
    //     "1                                                                 2",
    //     "1                                                                 2",
    //     "1                                                                 2",
    //     "1                                                                 2",
    //     "1                                                                 2",
    //     "1     P                                                           2",
    //     "1                                                       O         2",
    //     "1                                                                 2",
    //     "1         J                                                       2",
    //     "1                                                                 2",
    //     "1            B                                                    2",
    //     "1                    ^^                                           2",
    //     "###################################################################",
    //   ],
  ];
}
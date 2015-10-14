<?php


echo fib(3);



function fib($n)
{
    while($n != 0)
    {
        return fib($n - 1) + $n;
    }

}


/*function fib($n)
{
    $x = 0;
    for($i = 1; $i <= $n; $i++)
    {
        $x = $x + $i;
    }
    return $x;
}*/

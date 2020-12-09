<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class XmlController
{
    public function xml_rss_feed(): Response
    {




        $finder = new Finder();
        $finder->files()->in(__DIR__ . '/config');

        foreach($finder as $file)
        {
            $xml = $file->getContents();
        }

        $json = json_encode(simplexml_load_string($xml));

        $response = new Response(json_encode(array('feed' => $json)));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}

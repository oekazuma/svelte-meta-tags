<script>
  import { resolve } from '$app/paths';
</script>

<ul>
  <li>
    <a href={resolve('/')}> Normal SEO </a>
  </li>
  <li>
    <a href={resolve('/robots')}> Robots props </a>
  </li>
  <li>
    <a href={resolve('/robots/another')}> Another Robots props </a>
  </li>
  <li>
    <a href={resolve('/robots/googlebot')}> GoogleBot Robots props </a>
  </li>
  <li>
    <a href={resolve('/additionalRobots')}> Additional Robots props </a>
  </li>
  <li>
    <a href={resolve('/twitter')}> Twitter </a>
  </li>
  <li>
    <a href={resolve('/another')}> Another SEO </a>
  </li>
  <li>
    <a href={resolve('/video')}> Video SEO </a>
  </li>
  <li>
    <a href={resolve('/videoObjectType')}> VideoObjectType SEO </a>
  </li>
  <li>
    <a href={resolve('/article')}> Article SEO </a>
  </li>
  <li>
    <a href={resolve('/book')}> Book SEO </a>
  </li>
  <li>
    <a href={resolve('/profile')}> Profile SEO </a>
  </li>
  <li>
    <a href={resolve('/jsonldHead')}> JSON-LD Head SEO </a>
  </li>
  <li>
    <a href={resolve('/jsonldBody')}> JSON-LD Body SEO </a>
  </li>
  <li>
    <a href={resolve('/jsonldArray')}> JSON-LD Array SEO </a>
  </li>
  <li>
    <a href={resolve('/jsonldGraph')}> JSON-LD Graph SEO </a>
  </li>
  <li>
    <a href={resolve('/searchAction')}> SearchAction Test </a>
  </li>
</ul>

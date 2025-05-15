<script lang="ts">
  import { useMetaTags } from './meta-tags-context.svelte';
  import type { MetaTagsProps } from './types';
  import { box } from 'svelte-toolbelt';

  let { ...props }: Partial<MetaTagsProps> = $props();

  const metaTags = useMetaTags({ props: box.with(() => props) });

  let updatedTitle = $derived(
    metaTags.props.titleTemplate
      ? metaTags.props.title
        ? metaTags.props.titleTemplate.replace(/%s/g, metaTags.props.title)
        : metaTags.props.title
      : metaTags.props.title
  );

  let robotsParams = $state('');
  if (metaTags.props.additionalRobotsProps) {
    const {
      nosnippet,
      maxSnippet,
      maxImagePreview,
      maxVideoPreview,
      noarchive,
      noimageindex,
      notranslate,
      unavailableAfter
    } = metaTags.props.additionalRobotsProps;

    robotsParams = `${nosnippet ? ',nosnippet' : ''}${maxSnippet ? `,max-snippet:${maxSnippet}` : ''}${
      maxImagePreview ? `,max-image-preview:${maxImagePreview}` : ''
    }${noarchive ? ',noarchive' : ''}${unavailableAfter ? `,unavailable_after:${unavailableAfter}` : ''}${
      noimageindex ? ',noimageindex' : ''
    }${maxVideoPreview ? `,max-video-preview:${maxVideoPreview}` : ''}${notranslate ? ',notranslate' : ''}`;
  }

  $effect(() => {
    if (!metaTags.props.robots && metaTags.props.additionalRobotsProps) {
      console.warn('additionalRobotsProps cannot be used when robots is set to false');
    }
  });
</script>

<svelte:head>
  {#if updatedTitle}
    <title>{updatedTitle}</title>
  {/if}

  {#if metaTags.props.robots !== false}
    <meta name="robots" content="{metaTags.props.robots}{robotsParams}" />
  {/if}

  {#if metaTags.props.description}
    <meta name="description" content={metaTags.props.description} />
  {/if}

  {#if metaTags.props.canonical}
    <link rel="canonical" href={metaTags.props.canonical} />
  {/if}

  {#if metaTags.props.keywords?.length}
    <meta name="keywords" content={metaTags.props.keywords.join(', ')} />
  {/if}

  {#if metaTags.props.mobileAlternate}
    <link rel="alternate" media={metaTags.props.mobileAlternate.media} href={metaTags.props.mobileAlternate.href} />
  {/if}

  {#if metaTags.props.languageAlternates && metaTags.props.languageAlternates.length > 0}
    {#each metaTags.props.languageAlternates as languageAlternate (languageAlternate)}
      <link rel="alternate" hrefLang={languageAlternate.hrefLang} href={languageAlternate.href} />
    {/each}
  {/if}

  {#if metaTags.props.twitter}
    {#if metaTags.props.twitter.cardType}
      <meta name="twitter:card" content={metaTags.props.twitter.cardType} />
    {/if}
    {#if metaTags.props.twitter.site}
      <meta name="twitter:site" content={metaTags.props.twitter.site} />
    {/if}
    {#if metaTags.props.twitter.title}
      <meta name="twitter:title" content={metaTags.props.twitter.title} />
    {/if}
    {#if metaTags.props.twitter.description}
      <meta name="twitter:description" content={metaTags.props.twitter.description} />
    {/if}
    {#if metaTags.props.twitter.creator}
      <meta name="twitter:creator" content={metaTags.props.twitter.creator} />
    {/if}
    {#if metaTags.props.twitter.creatorId}
      <meta name="twitter:creator:id" content={metaTags.props.twitter.creatorId} />
    {/if}
    {#if metaTags.props.twitter.image}
      <meta name="twitter:image" content={metaTags.props.twitter.image} />
    {/if}
    {#if metaTags.props.twitter.imageAlt}
      <meta name="twitter:image:alt" content={metaTags.props.twitter.imageAlt} />
    {/if}
    {#if metaTags.props.twitter.player}
      <meta name="twitter:player" content={metaTags.props.twitter.player} />
    {/if}
    {#if metaTags.props.twitter.playerWidth}
      <meta name="twitter:player:width" content={metaTags.props.twitter.playerWidth.toString()} />
    {/if}
    {#if metaTags.props.twitter.playerHeight}
      <meta name="twitter:player:height" content={metaTags.props.twitter.playerHeight.toString()} />
    {/if}
    {#if metaTags.props.twitter.playerStream}
      <meta name="twitter:player:stream" content={metaTags.props.twitter.playerStream} />
    {/if}
    {#if metaTags.props.twitter.appNameIphone}
      <meta name="twitter:app:name:iphone" content={metaTags.props.twitter.appNameIphone} />
    {/if}
    {#if metaTags.props.twitter.appIdIphone}
      <meta name="twitter:app:id:iphone" content={metaTags.props.twitter.appIdIphone} />
    {/if}
    {#if metaTags.props.twitter.appUrlIphone}
      <meta name="twitter:app:url:iphone" content={metaTags.props.twitter.appUrlIphone} />
    {/if}
    {#if metaTags.props.twitter.appNameIpad}
      <meta name="twitter:app:name:ipad" content={metaTags.props.twitter.appNameIpad} />
    {/if}
    {#if metaTags.props.twitter.appIdIpad}
      <meta name="twitter:app:id:ipad" content={metaTags.props.twitter.appIdIpad} />
    {/if}
    {#if metaTags.props.twitter.appUrlIpad}
      <meta name="twitter:app:url:ipad" content={metaTags.props.twitter.appUrlIpad} />
    {/if}
    {#if metaTags.props.twitter.appNameGoogleplay}
      <meta name="twitter:app:name:googleplay" content={metaTags.props.twitter.appNameGoogleplay} />
    {/if}
    {#if metaTags.props.twitter.appIdGoogleplay}
      <meta name="twitter:app:id:googleplay" content={metaTags.props.twitter.appIdGoogleplay} />
    {/if}
    {#if metaTags.props.twitter.appUrlGoogleplay}
      <meta name="twitter:app:url:googleplay" content={metaTags.props.twitter.appUrlGoogleplay} />
    {/if}
  {/if}

  {#if metaTags.props.facebook}
    <meta property="fb:app_id" content={metaTags.props.facebook.appId} />
  {/if}

  {#if metaTags.props.openGraph}
    {#if metaTags.props.openGraph.url || metaTags.props.canonical}
      <meta property="og:url" content={metaTags.props.openGraph.url || metaTags.props.canonical} />
    {/if}

    {#if metaTags.props.openGraph.type}
      <meta property="og:type" content={metaTags.props.openGraph.type.toLowerCase()} />
      {#if metaTags.props.openGraph.type.toLowerCase() === 'profile' && metaTags.props.openGraph.profile}
        {#if metaTags.props.openGraph.profile.firstName}
          <meta property="profile:first_name" content={metaTags.props.openGraph.profile.firstName} />
        {/if}
        {#if metaTags.props.openGraph.profile.lastName}
          <meta property="profile:last_name" content={metaTags.props.openGraph.profile.lastName} />
        {/if}
        {#if metaTags.props.openGraph.profile.username}
          <meta property="profile:username" content={metaTags.props.openGraph.profile.username} />
        {/if}
        {#if metaTags.props.openGraph.profile.gender}
          <meta property="profile:gender" content={metaTags.props.openGraph.profile.gender} />
        {/if}
      {:else if metaTags.props.openGraph.type.toLowerCase() === 'book' && metaTags.props.openGraph.book}
        {#if metaTags.props.openGraph.book.authors && metaTags.props.openGraph.book.authors.length}
          {#each metaTags.props.openGraph.book.authors as author (author)}
            <meta property="book:author" content={author} />
          {/each}
        {/if}
        {#if metaTags.props.openGraph.book.isbn}
          <meta property="book:isbn" content={metaTags.props.openGraph.book.isbn} />
        {/if}
        {#if metaTags.props.openGraph.book.releaseDate}
          <meta property="book:release_date" content={metaTags.props.openGraph.book.releaseDate} />
        {/if}
        {#if metaTags.props.openGraph.book.tags && metaTags.props.openGraph.book.tags.length}
          {#each metaTags.props.openGraph.book.tags as tag (tag)}
            <meta property="book:tag" content={tag} />
          {/each}
        {/if}
      {:else if metaTags.props.openGraph.type.toLowerCase() === 'article' && metaTags.props.openGraph.article}
        {#if metaTags.props.openGraph.article.publishedTime}
          <meta property="article:published_time" content={metaTags.props.openGraph.article.publishedTime} />
        {/if}
        {#if metaTags.props.openGraph.article.modifiedTime}
          <meta property="article:modified_time" content={metaTags.props.openGraph.article.modifiedTime} />
        {/if}
        {#if metaTags.props.openGraph.article.expirationTime}
          <meta property="article:expiration_time" content={metaTags.props.openGraph.article.expirationTime} />
        {/if}
        {#if metaTags.props.openGraph.article.authors && metaTags.props.openGraph.article.authors.length}
          {#each metaTags.props.openGraph.article.authors as author (author)}
            <meta property="article:author" content={author} />
          {/each}
        {/if}
        {#if metaTags.props.openGraph.article.section}
          <meta property="article:section" content={metaTags.props.openGraph.article.section} />
        {/if}
        {#if metaTags.props.openGraph.article.tags && metaTags.props.openGraph.article.tags.length}
          {#each metaTags.props.openGraph.article.tags as tag (tag)}
            <meta property="article:tag" content={tag} />
          {/each}
        {/if}
      {:else if metaTags.props.openGraph.type.toLowerCase() === 'video.movie' || metaTags.props.openGraph.type.toLowerCase() === 'video.episode' || metaTags.props.openGraph.type.toLowerCase() === 'video.tv_show' || (metaTags.props.openGraph.type.toLowerCase() === 'video.other' && metaTags.props.openGraph.video)}
        {#if metaTags.props.openGraph.video?.actors && metaTags.props.openGraph.video.actors.length}
          {#each metaTags.props.openGraph.video.actors as actor (actor)}
            {#if actor.profile}
              <meta property="video:actor" content={actor.profile} />
            {/if}
            {#if actor.role}
              <meta property="video:actor:role" content={actor.role} />
            {/if}
          {/each}
        {/if}
        {#if metaTags.props.openGraph.video?.directors && metaTags.props.openGraph.video.directors.length}
          {#each metaTags.props.openGraph.video.directors as director (director)}
            <meta property="video:director" content={director} />
          {/each}
        {/if}
        {#if metaTags.props.openGraph.video?.writers && metaTags.props.openGraph.video.writers.length}
          {#each metaTags.props.openGraph.video.writers as writer (writer)}
            <meta property="video:writer" content={writer} />
          {/each}
        {/if}
        {#if metaTags.props.openGraph.video?.duration}
          <meta property="video:duration" content={metaTags.props.openGraph.video.duration.toString()} />
        {/if}
        {#if metaTags.props.openGraph.video?.releaseDate}
          <meta property="video:release_date" content={metaTags.props.openGraph.video.releaseDate} />
        {/if}
        {#if metaTags.props.openGraph.video?.tags && metaTags.props.openGraph.video.tags.length}
          {#each metaTags.props.openGraph.video.tags as tag (tag)}
            <meta property="video:tag" content={tag} />
          {/each}
        {/if}
        {#if metaTags.props.openGraph.video?.series}
          <meta property="video:series" content={metaTags.props.openGraph.video.series} />
        {/if}
      {/if}
    {/if}

    {#if metaTags.props.openGraph.title || updatedTitle}
      <meta property="og:title" content={metaTags.props.openGraph.title || updatedTitle} />
    {/if}

    {#if metaTags.props.openGraph.description || metaTags.props.description}
      <meta property="og:description" content={metaTags.props.openGraph.description || metaTags.props.description} />
    {/if}

    {#if metaTags.props.openGraph.images && metaTags.props.openGraph.images.length}
      {#each metaTags.props.openGraph.images as image (image)}
        <meta property="og:image" content={image.url} />
        {#if image.alt}
          <meta property="og:image:alt" content={image.alt} />
        {/if}
        {#if image.width}
          <meta property="og:image:width" content={image.width.toString()} />
        {/if}
        {#if image.height}
          <meta property="og:image:height" content={image.height.toString()} />
        {/if}
        {#if image.secureUrl}
          <meta property="og:image:secure_url" content={image.secureUrl.toString()} />
        {/if}
        {#if image.type}
          <meta property="og:image:type" content={image.type.toString()} />
        {/if}
      {/each}
    {/if}

    {#if metaTags.props.openGraph.videos && metaTags.props.openGraph.videos.length}
      {#each metaTags.props.openGraph.videos as video (video)}
        <meta property="og:video" content={video.url} />
        {#if video.width}
          <meta property="og:video:width" content={video.width.toString()} />
        {/if}
        {#if video.height}
          <meta property="og:video:height" content={video.height.toString()} />
        {/if}
        {#if video.secureUrl}
          <meta property="og:video:secure_url" content={video.secureUrl.toString()} />
        {/if}
        {#if video.type}
          <meta property="og:video:type" content={video.type.toString()} />
        {/if}
      {/each}
    {/if}

    {#if metaTags.props.openGraph.audio && metaTags.props.openGraph.audio.length}
      {#each metaTags.props.openGraph.audio as audio (audio)}
        <meta property="og:audio" content={audio.url} />
        {#if audio.secureUrl}
          <meta property="og:audio:secure_url" content={audio.secureUrl.toString()} />
        {/if}
        {#if audio.type}
          <meta property="og:audio:type" content={audio.type.toString()} />
        {/if}
      {/each}
    {/if}

    {#if metaTags.props.openGraph.locale}
      <meta property="og:locale" content={metaTags.props.openGraph.locale} />
    {/if}

    {#if metaTags.props.openGraph.siteName}
      <meta property="og:site_name" content={metaTags.props.openGraph.siteName} />
    {/if}
  {/if}

  {#if metaTags.props.additionalMetaTags && Array.isArray(metaTags.props.additionalMetaTags)}
    {#each metaTags.props.additionalMetaTags as tag (tag)}
      <meta {...tag.httpEquiv ? { ...tag, 'http-equiv': tag.httpEquiv } : tag} />
    {/each}
  {/if}

  {#if metaTags.props.additionalLinkTags?.length}
    {#each metaTags.props.additionalLinkTags as tag (tag)}
      <link {...tag} />
    {/each}
  {/if}
</svelte:head>
